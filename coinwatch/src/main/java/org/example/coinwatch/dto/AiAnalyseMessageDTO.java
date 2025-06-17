package org.example.coinwatch.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

public class AiAnalyseMessageDTO {
    private String symbol;
    private List<PricePoint> data;
    private Long userId;

    public static class PricePoint {
        private BigDecimal price;
        private LocalDateTime date;

        public PricePoint(BigDecimal price, LocalDateTime date) {
            this.price = price;
            this.date = date;
        }

        public BigDecimal getPrice() {
            return price;
        }

        public void setPrice(BigDecimal price) {
            this.price = price;
        }

        public LocalDateTime getDate() {
            return date;
        }

        public void setDate(LocalDateTime date) {
            this.date = date;
        }
    }

    public AiAnalyseMessageDTO(String symbol, List<PricePoint> data, Long userId) {
        this.symbol = symbol;
        this.data = data;
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public List<PricePoint> getData() {
        return data;
    }

    public void setData(List<PricePoint> data) {
        this.data = data;
    }
}
