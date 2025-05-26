package org.example.coinwatch.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public interface AggregatedPricesForAnalyseDTO {
    LocalDateTime getBucket();
    String getCryptoId();
    BigDecimal getAvgPrice();
}
