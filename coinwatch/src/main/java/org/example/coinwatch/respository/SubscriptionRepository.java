package org.example.coinwatch.respository;

import org.example.coinwatch.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
}
