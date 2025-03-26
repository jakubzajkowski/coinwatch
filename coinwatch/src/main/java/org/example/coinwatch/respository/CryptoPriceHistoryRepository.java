package org.example.coinwatch.respository;

import org.example.coinwatch.entity.CryptoPriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.ZonedDateTime;
import java.util.List;

public interface CryptoPriceHistoryRepository extends JpaRepository<CryptoPriceHistory,Long> {
    List<CryptoPriceHistory> findBySymbolAndRecordedAtAfter(String symbol, ZonedDateTime timestamp);
}
