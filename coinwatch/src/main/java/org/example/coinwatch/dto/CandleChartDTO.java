package org.example.coinwatch.dto;

import java.math.BigDecimal;

public interface CandleChartDTO {
    BigDecimal getOpen();
    BigDecimal getClose();
    BigDecimal getHigh();
    BigDecimal getLow();
}
