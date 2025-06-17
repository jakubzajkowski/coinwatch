package org.example.coinwatch.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface AveragePricesDTO {
    LocalDateTime getBucket();
    BigDecimal getAverage();
}
