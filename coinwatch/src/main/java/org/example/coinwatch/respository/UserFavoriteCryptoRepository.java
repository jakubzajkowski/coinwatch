package org.example.coinwatch.respository;

import org.example.coinwatch.entity.UserFavoriteCrypto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFavoriteCryptoRepository extends JpaRepository<UserFavoriteCrypto, Long> {
}
