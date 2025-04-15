package org.example.coinwatch.respository;

import org.example.coinwatch.entity.GlobalMarket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GlobalMarketRepository extends JpaRepository<GlobalMarket, Long> {
}
