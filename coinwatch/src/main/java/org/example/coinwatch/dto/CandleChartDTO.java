package org.example.coinwatch.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface CandleChartDTO {
    LocalDateTime getBucket();
    BigDecimal getOpen();
    BigDecimal getClose();
    BigDecimal getHigh();
    BigDecimal getLow();
}
