package org.example.coinwatch.respository;

import org.example.coinwatch.dto.AggregatedPricesForAnalyseDTO;
import org.example.coinwatch.dto.CandleChartDTO;
import org.example.coinwatch.entity.CryptoPriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

public interface CryptoPriceHistoryRepository extends JpaRepository<CryptoPriceHistory,Long> {
    List<CryptoPriceHistory> findByCryptoIdAndRecordedAtAfter(String symbol, ZonedDateTime timestamp);
    List<CryptoPriceHistory> findByCryptoIdOrderByRecordedAtAsc(String cryptoId);

    @Query(value = """
    SELECT *
    FROM crypto_price_history
    WHERE crypto_id = :cryptoId
      AND recorded_at >= now() - CAST(:interval AS interval)
    ORDER BY recorded_at
    """, nativeQuery = true)
    Optional<List<CryptoPriceHistory>> findByCryptoIdAndRange(
            @Param("cryptoId") String cryptoId,
            @Param("interval") String interval
    );

    @Query(value = """
    SELECT time_bucket(CAST(:interval AS interval), recorded_at) as bucket,
           first(price, recorded_at) as open,
           last(price, recorded_at) as close,
           max(price) as high,
           min(price) as low
    FROM crypto_price_history
    WHERE crypto_id = :cryptoId AND recorded_at BETWEEN :from AND :to
    GROUP BY bucket
    ORDER BY bucket
    """, nativeQuery = true)
    Optional<List<CandleChartDTO>> findCandleChart(
            @Param("interval") String interval,
            @Param("cryptoId") String cryptoId,
            @Param("from") ZonedDateTime from,
            @Param("to") ZonedDateTime to
    );

    @Query(value = """
        SELECT
            time_bucket('6 hours', recorded_at) AS bucket,
            crypto_id,
            AVG(price) AS avg_price
        FROM
            crypto_price_history
        WHERE
            crypto_id = :cryptoId
            AND recorded_at > now() - INTERVAL '1 month'
        GROUP BY
            bucket, crypto_id
        ORDER BY
            bucket
        """, nativeQuery = true)
    List<AggregatedPricesForAnalyseDTO> findByCryptoIdAggregatedPricesForAnalyse(@Param("cryptoId") String cryptoId);
}
