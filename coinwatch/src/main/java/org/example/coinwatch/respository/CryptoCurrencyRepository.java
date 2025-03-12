package org.example.coinwatch.respository;

import org.example.coinwatch.entity.CryptoCurrency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CryptoCurrencyRepository extends JpaRepository<CryptoCurrency,Long> {
    Optional<CryptoCurrency> findByCryptoId(String cryptoId);
}
