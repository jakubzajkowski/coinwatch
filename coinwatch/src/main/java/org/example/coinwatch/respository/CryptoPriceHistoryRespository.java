package org.example.coinwatch.respository;

import org.example.coinwatch.entity.CryptoPriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CryptoPriceHistoryRespository extends JpaRepository<CryptoPriceHistory,Long> {
}
