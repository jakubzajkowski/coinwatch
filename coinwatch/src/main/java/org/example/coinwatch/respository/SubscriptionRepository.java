package org.example.coinwatch.respository;

import org.example.coinwatch.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
    Optional<List<Subscription>> findSubscriptionsByUserId(long id);
    Optional<Subscription> findByUserIdAndCryptoCurrencyId(Long userId, Long cryptoId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Subscription s WHERE s.user.id = :userId AND s.cryptoCurrency.id = :cryptoId")
    void deleteByUserIdAndCryptoId(Long userId, Long cryptoId);
}
