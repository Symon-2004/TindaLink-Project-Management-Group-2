package com.transaction_service.client;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.server.ResponseStatusException;

import com.transaction_service.common.exception.BadRequestException;
import com.transaction_service.common.exception.NotFoundException;

@Component
public class TindaLinkClient {

    public record ReserveCall(String userId, String storeId, String paymentMethod) {}

    public record ReservedItem(String productId, String productName, Integer quantity,
                               BigDecimal unitPrice, BigDecimal subtotal) {}

    public record ReserveResult(List<ReservedItem> items, BigDecimal subtotal) {}

    public record ReleaseCall(String userId, List<ReservedItem> items, boolean restoreCart) {}

    private final RestClient client;

    public TindaLinkClient(@Value("${tindalink.base-url}") String baseUrl,
                           @Value("${tindalink.internal-key}") String key) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(10000);

        this.client = RestClient.builder()
                .baseUrl(baseUrl)
                .requestFactory(factory)
                .defaultHeader("X-Internal-Key", key)
                .build();
    }

    public ReserveResult reserve(ReserveCall body) {
        try {
            return client.post().uri("/internal/checkout/reserve")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(ReserveResult.class);
        } catch (HttpClientErrorException e) {
            throw translate(e);
        } catch (RestClientException e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Product service unavailable");
        }
    }

    public void release(ReleaseCall body) {
        try {
            client.post().uri("/internal/checkout/release")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();
        } catch (HttpClientErrorException e) {
            throw translate(e);
        } catch (RestClientException e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Product service unavailable");
        }
    }

    // Converts Tindalink's error body ({statusCode, message, data}) into this service's exceptions
    private RuntimeException translate(HttpClientErrorException e) {
        String message = "Request rejected";
        try {
            Map<?, ?> body = e.getResponseBodyAs(Map.class);
            if (body != null && body.get("message") != null) {
                message = body.get("message").toString().replace("FAILED IN:", "").trim();
            }
        } catch (RuntimeException ignored) {
            // keep the default message
        }

        return e.getStatusCode().value() == 404
                ? new NotFoundException(message)
                : new BadRequestException(message);
 }
}
