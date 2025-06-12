package org.example.coinwatch.respository;

import org.springframework.data.repository.query.Param;
import org.example.coinwatch.entity.CryptoCurrency;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CryptoCurrencyRepository extends JpaRepository<CryptoCurrency,Long> {
    Optional<CryptoCurrency> findByCryptoId(String cryptoId);
    Optional<List<CryptoCurrency>> findAllBy
    Optional<List<CryptoCurrency>> findByCryptoIdContainingIgnoreCase(String name);
    Page<CryptoCurrency> findAll(Pageable pageable);
    @Query("SELECT c FROM CryptoCurrency c WHERE " +
            "(:minPrice IS NULL OR c.currentPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR c.currentPrice <= :maxPrice) AND " +
            "(:minMarketCap IS NULL OR c.marketCap >= :minMarketCap) AND " +
            "(:maxMarketCap IS NULL OR c.marketCap <= :maxMarketCap) AND " +
            "(:minPriceChange24h IS NULL OR c.priceChange24h >= :minPriceChange24h) AND " +
            "(:maxPriceChange24h IS NULL OR c.priceChange24h <= :maxPriceChange24h) AND " +
            "(:minHighestPrice24h IS NULL OR c.high24h >= :minHighestPrice24h) AND " +
            "(:maxHighestPrice24h IS NULL OR c.high24h <= :maxHighestPrice24h) AND " +
            "(:minLowestPrice24h IS NULL OR c.low24h >= :minLowestPrice24h) AND " +
            "(:maxLowestPrice24h IS NULL OR c.low24h <= :maxLowestPrice24h)"
            )
    Page<CryptoCurrency> findAllWithFilters(
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("minMarketCap") Double minMarketCap,
            @Param("maxMarketCap") Double maxMarketCap,
            @Param("minPriceChange24h") Double minPriceChange24h,
            @Param("maxPriceChange24h") Double maxPriceChange24h,
            @Param("minHighestPrice24h") Double minHighestPrice24h,
            @Param("maxHighestPrice24h") Double maxHighestPrice24h,
            @Param("minLowestPrice24h") Double minLowestPrice24h,
            @Param("maxLowestPrice24h") Double maxLowestPrice24h,
            Pageable pageable
    );
}
