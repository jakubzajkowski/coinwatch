package org.example.coinwatch.entity;


import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity
@Table(name = "crypto_price_history")
public class CryptoPriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "crypto_id", nullable = false)
    private String cryptoId;

    @Column(name = "symbol", nullable = false)
    private String symbol;

    @Column(name = "price", nullable = false, precision = 19, scale = 8)
    private BigDecimal price;

    @Column(name = "recorded_at", nullable = false, updatable = false)
    private ZonedDateTime recordedAt = ZonedDateTime.now();

    public CryptoPriceHistory(String cryptoId, String symbol, BigDecimal price) {
        this.cryptoId = cryptoId;
        this.symbol = symbol;
        this.price = price;
    }

    public CryptoPriceHistory() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCryptoId() {
        return cryptoId;
    }

    public void setCryptoId(String cryptoId) {
        this.cryptoId = cryptoId;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public ZonedDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(ZonedDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }

    @Override
    public String toString() {
        return "CryptoPriceHistory{" +
                "id=" + id +
                ", cryptoId='" + cryptoId + '\'' +
                ", symbol='" + symbol + '\'' +
                ", price=" + price +
                ", recordedAt=" + recordedAt +
                '}';
    }
}
