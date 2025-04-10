package org.example.coinwatch.respository;

import org.example.coinwatch.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
    Optional<List<Subscription>> findSubscriptionsByUserId(long id);
    Optional<Subscription> findByUserIdAndCryptoCurrencyId(Long userId, Long cryptoId);
}
