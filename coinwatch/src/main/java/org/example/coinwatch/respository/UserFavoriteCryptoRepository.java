package org.example.coinwatch.respository;

import org.example.coinwatch.entity.UserFavoriteCrypto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserFavoriteCryptoRepository extends JpaRepository<UserFavoriteCrypto, Long> {
    List<UserFavoriteCrypto> findByUserId(Long userId);
    Optional<UserFavoriteCrypto> findByUserIdAndCryptoCurrencyId(Long userId, Long cryptoCurrencyId);
}
