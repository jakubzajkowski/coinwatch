package org.example.coinwatch.respository;

import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.entity.UserCryptoTrigger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserCryptoTriggerRepository extends JpaRepository<UserCryptoTrigger, Long> {
    Optional<List<UserCryptoTrigger>> findAllByUser(User user);

    Optional<List<UserCryptoTrigger>> findByCryptoCurrencyAndTriggeredFalse(CryptoCurrency cryptoCurrency);
}
