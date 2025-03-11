package org.example.coinwatch.respository;

import org.example.coinwatch.entity.CryptoPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CryptoPriceRepository extends JpaRepository<CryptoPrice, Long> {
    Optional<CryptoPrice> findBySymbol(String symbol);
}
