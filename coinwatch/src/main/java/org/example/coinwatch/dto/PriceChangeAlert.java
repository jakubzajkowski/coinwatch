package org.example.coinwatch.dto;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

public class PriceChangeAlert {
    private String symbol;
    private BigDecimal changePercent;
    private BigDecimal oldPrice;
    private BigDecimal newPrice;

    public PriceChangeAlert(String symbol, BigDecimal changePercent, BigDecimal oldPrice, BigDecimal newPrice) {
        this.symbol = symbol;
        this.changePercent = changePercent;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public BigDecimal getChangePercent() {
        return changePercent;
    }

    public void setChangePercent(BigDecimal changePercent) {
        this.changePercent = changePercent;
    }

    public BigDecimal getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(BigDecimal oldPrice) {
        this.oldPrice = oldPrice;
    }

    public BigDecimal getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(BigDecimal newPrice) {
        this.newPrice = newPrice;
    }
}
