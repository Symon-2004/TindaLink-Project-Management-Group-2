package com.tindalink_service.checkout;

import com.tindalink_service.cart.Cart;
import com.tindalink_service.cart.repository.CartRepository;
import com.tindalink_service.checkout.dto.ReleaseRequest;
import com.tindalink_service.checkout.dto.ReserveRequest;
import com.tindalink_service.checkout.dto.ReserveResponse;
import com.tindalink_service.checkout.dto.ReservedItemDto;
import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.store.repository.StoreRepository;
import com.tindalink_service.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/internal/checkout")
@RequiredArgsConstructor
public class InternalCheckoutController {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;

    @PostMapping("/reserve")
    public ResponseEntity<ReserveResponse> reserve(@RequestBody ReserveRequest request) {
        log.info("Processing internal reserve for userId: {}, storeId: {}", request.getUserId(), request.getStoreId());

        if (request.getUserId() != null && !userRepository.existsById(request.getUserId())) {
            throw new NotFoundException("User not found: " + request.getUserId());
        }

        if (request.getStoreId() != null && !storeRepository.existsById(request.getStoreId())) {
            throw new NotFoundException("Store not found: " + request.getStoreId());
        }

        List<Cart> cartItems = cartRepository.findByUserId(request.getUserId());
        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cart is empty for user: " + request.getUserId());
        }

        List<ReservedItemDto> items = new ArrayList<>();
        BigDecimal totalSubtotal = BigDecimal.ZERO;

        for (Cart cart : cartItems) {
            BigDecimal subtotal = cart.getSubtotal() != null
                    ? cart.getSubtotal()
                    : (cart.getUnitPrice() != null && cart.getQuantity() != null
                    ? cart.getUnitPrice().multiply(BigDecimal.valueOf(cart.getQuantity()))
                    : BigDecimal.ZERO);

            items.add(ReservedItemDto.builder()
                    .productId(cart.getProductId())
                    .productName(cart.getProductName())
                    .quantity(cart.getQuantity())
                    .unitPrice(cart.getUnitPrice())
                    .subtotal(subtotal)
                    .build());

            totalSubtotal = totalSubtotal.add(subtotal);
        }

        // Claim and clear cart
        cartRepository.deleteByUserId(request.getUserId());

        return ResponseEntity.ok(ReserveResponse.builder()
                .items(items)
                .subtotal(totalSubtotal)
                .build());
    }

    @PostMapping("/release")
    public ResponseEntity<Void> release(@RequestBody ReleaseRequest request) {
        log.info("Processing internal release for userId: {}, restoreCart: {}", request.getUserId(), request.isRestoreCart());

        if (request.isRestoreCart() && request.getUserId() != null && request.getItems() != null) {
            for (ReservedItemDto item : request.getItems()) {
                Cart cart = Cart.builder()
                        .userId(request.getUserId())
                        .productId(item.getProductId())
                        .productName(item.getProductName())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .subtotal(item.getSubtotal())
                        .build();
                cartRepository.save(cart);
            }
        }

        return ResponseEntity.ok().build();
    }
}
