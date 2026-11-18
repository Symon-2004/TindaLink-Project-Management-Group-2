package com.transaction_service.Order.service;

import static com.transaction_service.Order.Constant.OrderMessages.*;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;


import com.transaction_service.Order.Order;
import com.transaction_service.Order.Order_Products;
import com.transaction_service.Order.dto.request.OrderRequest;
import com.transaction_service.Order.dto.request.OrderStatusRequest;
import com.transaction_service.Order.dto.response.OrderResponse;
import com.transaction_service.Order.repository.OrderProductsRepository;
import com.transaction_service.Order.repository.OrderRepository;
import com.transaction_service.client.TindaLinkClient;
import org.springframework.beans.factory.annotation.Value;   // NOT lombok.Value
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.transaction_service.common.enums.OrderPaymentMethod;
import com.transaction_service.common.enums.OrderStatus;
import com.transaction_service.common.exception.BadRequestException;
import com.transaction_service.common.exception.NotFoundException;
import com.transaction_service.Order.Order;
import com.transaction_service.Order.Order_Products;
import com.transaction_service.Order.dto.request.OrderRequest;
import com.transaction_service.Order.dto.request.OrderStatusRequest;
import com.transaction_service.Order.dto.response.OrderResponse;
import com.transaction_service.Order.repository.OrderProductsRepository;
import com.transaction_service.Order.repository.OrderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final MongoTemplate mongoTemplate;
    private final OrderRepository orderRepository;
    private final OrderProductsRepository orderProductsRepository;
    private final TindaLinkClient tindaLinkClient;

    @Value("${order.shipping-fee:0}")
    private BigDecimal shippingFee;

    // ===================== CHECKOUT =====================

    public OrderResponse checkout(OrderRequest request) {

        // Tindalink validates the user, store and payment method, claims the cart and deducts stock
        TindaLinkClient.ReserveResult reserved = tindaLinkClient.reserve(
                new TindaLinkClient.ReserveCall(
                        request.getUserId(), request.getStoreId(), request.getPaymentMethod().name()));

        List<TindaLinkClient.ReservedItem> items = reserved.items();
        BigDecimal subtotal = reserved.subtotal();
        BigDecimal fee = shippingFee.setScale(2, RoundingMode.HALF_UP);

        OrderStatus initialStatus = request.getPaymentMethod() == OrderPaymentMethod.COD
                ? OrderStatus.PROCESSING
                : OrderStatus.PENDING_VERIFICATION;

        String orderId = null;

        try {
            Order order = orderRepository.save(Order.builder()
                    .storeId(request.getStoreId())
                    .userId(request.getUserId())
                    .shippingAddress(request.getShippingAddress().trim())
                    .subtotal(subtotal)
                    .shippingFee(fee)
                    .totalAmount(subtotal.add(fee))
                    .paymentMethod(request.getPaymentMethod())
                    .orderStatus(initialStatus)
                    .build());
            orderId = order.getId();
            final String savedOrderId = order.getId();

            List<Order_Products> lines = items.stream()
                    .map(i -> Order_Products.builder()
                            .orderId(savedOrderId)
                            .productId(i.productId())
                            .productName(i.productName())
                            .quantity(i.quantity())
                            .unitPrice(i.unitPrice())
                            .subtotal(i.subtotal())
                            .build())
                    .toList();

            return OrderResponse.toResponse(order, orderProductsRepository.saveAll(lines));

        } catch (RuntimeException ex) {
            // Saving failed: remove the partial order, then give the stock and cart back
            if (orderId != null) {
                try {
                    orderProductsRepository.deleteByOrderId(orderId);
                    orderRepository.deleteById(orderId);
                } catch (RuntimeException e) {
                    log.error("Checkout rollback: failed to delete order {}", orderId, e);
                }
            }
            try {
                tindaLinkClient.release(new TindaLinkClient.ReleaseCall(request.getUserId(), items, true));
            } catch (RuntimeException e) {
                log.error("Checkout rollback: failed to release stock and cart for user {}", request.getUserId(), e);
            }
            throw ex;
        }
    }

    // ===================== READ =====================

    public OrderResponse getById(String id) {
        Order order = findOrThrow(id);
        return OrderResponse.toResponse(order, orderProductsRepository.findByOrderId(id));
    }

    public List<OrderResponse> getByUser(String userId) {
        return toResponses(orderRepository.findByUserIdOrderByCreatedAtDesc(userId));
    }

    public List<OrderResponse> getByStore(String storeId, OrderStatus status) {
        List<Order> orders = (status == null)
                ? orderRepository.findByStoreIdOrderByCreatedAtDesc(storeId)
                : orderRepository.findByStoreIdAndOrderStatusOrderByCreatedAtDesc(storeId, status);
        return toResponses(orders);
    }

    // ===================== STATUS =====================

    public OrderResponse updateStatus(String id, OrderStatusRequest request) {
        OrderStatus target = request.getOrderStatus();
        Set<OrderStatus> allowedFrom = allowedSources(target);

        if (allowedFrom.isEmpty()) {
            throw new BadRequestException(ORDER_STATUS_NOT_ALLOWED + target);
        }

        // Atomic: only changes the order if it is still in an allowed status
        Order updated = mongoTemplate.findAndModify(
                new Query(Criteria.where("id").is(id).and("orderStatus").in(allowedFrom)),
                new Update().set("orderStatus", target).set("updatedAt", LocalDateTime.now()),
                FindAndModifyOptions.options().returnNew(true),
                Order.class);

        if (updated == null) {
            Order existing = findOrThrow(id);   // throws not-found if the id doesn't exist
            throw new BadRequestException(
                    ORDER_STATUS_INVALID_CHANGE.formatted(existing.getOrderStatus(), target));
        }

        List<Order_Products> lines = orderProductsRepository.findByOrderId(id);

        if (target == OrderStatus.CANCELLED) {
            try {
                tindaLinkClient.release(new TindaLinkClient.ReleaseCall(
                        null,
                        lines.stream()
                                .map(l -> new TindaLinkClient.ReservedItem(
                                        l.getProductId(), l.getProductName(), l.getQuantity(),
                                        l.getUnitPrice(), l.getSubtotal()))
                                .toList(),
                        false));
            } catch (RuntimeException e) {
                log.error("Order {} was cancelled but stock was NOT restored", id, e);
            }
        }

        return OrderResponse.toResponse(updated, lines);
    }

    // ===================== HELPERS =====================

    private static Set<OrderStatus> allowedSources(OrderStatus target) {
        return switch (target) {
            case PAID -> EnumSet.of(OrderStatus.PENDING_VERIFICATION);
            case PROCESSING -> EnumSet.of(OrderStatus.PAID);
            case SHIPPED -> EnumSet.of(OrderStatus.PROCESSING);
            case COMPLETED -> EnumSet.of(OrderStatus.SHIPPED);
            case CANCELLED -> EnumSet.of(
                    OrderStatus.PENDING_VERIFICATION, OrderStatus.PAID, OrderStatus.PROCESSING);
            case PENDING_VERIFICATION -> EnumSet.noneOf(OrderStatus.class);
        };
    }

    private List<OrderResponse> toResponses(List<Order> orders) {
        if (orders.isEmpty()) {
            return List.of();
        }
        Map<String, List<Order_Products>> linesByOrder = orderProductsRepository
                .findByOrderIdIn(orders.stream().map(Order::getId).toList())
                .stream()
                .collect(Collectors.groupingBy(Order_Products::getOrderId));

        return orders.stream()
                .map(o -> OrderResponse.toResponse(o, linesByOrder.getOrDefault(o.getId(), List.of())))
                .toList();
    }

    private Order findOrThrow(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ORDER_NOT_FOUND + id));
    }
}