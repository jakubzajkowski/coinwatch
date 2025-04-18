package org.example.coinwatch.respository;

import io.lettuce.core.dynamic.annotation.Param;
import org.example.coinwatch.entity.CryptoCurrency;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CryptoCurrencyRepository extends JpaRepository<CryptoCurrency,Long> {
    Optional<CryptoCurrency> findByCryptoId(String cryptoId);
    Optional<List<CryptoCurrency>> findByCryptoIdContainingIgnoreCase(String name);
    Page<CryptoCurrency> findAll(Pageable pageable);
}
