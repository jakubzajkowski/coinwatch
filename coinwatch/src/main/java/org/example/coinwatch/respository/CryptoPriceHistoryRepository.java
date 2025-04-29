package org.example.coinwatch.respository;

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
}
