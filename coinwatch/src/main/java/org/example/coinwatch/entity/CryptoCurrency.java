package org.example.coinwatch.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "crypto_currencies")
public class CryptoCurrency implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unikalny identyfikator encji (primary key)

    @Column(name = "crypto_id", unique = true, nullable = false)
    private String cryptoId; // Identyfikator kryptowaluty (np. "bitcoin")

    @Column(nullable = false)
    private String symbol; // Symbol kryptowaluty (np. "btc")

    @Column(nullable = false)
    private String name; // Nazwa kryptowaluty (np. "Bitcoin")

    @Column(name = "image_url")
    private String imageUrl; // URL do obrazka kryptowaluty

    @Column(name = "current_price", precision = 20, scale = 2)
    private BigDecimal currentPrice; // Aktualna cena

    @Column(name = "market_cap")
    private Long marketCap; // Kapitalizacja rynkowa

    @Column(name = "market_cap_rank")
    private Integer marketCapRank; // Ranking kapitalizacji

    @Column(name = "fully_diluted_valuation")
    private Long fullyDilutedValuation; // W pełni rozcieńczona wycena

    @Column(name = "total_volume")
    private Long totalVolume; // Całkowity wolumen

    @Column(name = "high_24h", precision = 20, scale = 2)
    private BigDecimal high24h; // Najwyższa cena w ciągu 24 godzin

    @Column(name = "low_24h", precision = 20, scale = 2)
    private BigDecimal low24h; // Najniższa cena w ciągu 24 godzin

    @Column(name = "price_change_24h", precision = 20, scale = 2)
    private BigDecimal priceChange24h; // Zmiana ceny w ciągu 24 godzin

    @Column(name = "price_change_percentage_24h", precision = 20, scale = 2)
    private BigDecimal priceChangePercentage24h; // Procentowa zmiana ceny w ciągu 24 godzin

    @Column(name = "market_cap_change_24h")
    private Long marketCapChange24h; // Zmiana kapitalizacji w ciągu 24 godzin

    @Column(name = "market_cap_change_percentage_24h", precision = 20, scale = 2)
    private BigDecimal marketCapChangePercentage24h; // Procentowa zmiana kapitalizacji w ciągu 24 godzin

    @Column(name = "circulating_supply")
    private Long circulatingSupply; // Obecna podaż

    @Column(name = "total_supply")
    private Long totalSupply; // Całkowita podaż

    @Column(name = "max_supply")
    private Long maxSupply; // Maksymalna podaż

    @Column(precision = 20, scale = 2)
    private BigDecimal ath; // All-Time High (najwyższa cena w historii)

    @Column(name = "ath_change_percentage", precision = 20, scale = 2)
    private BigDecimal athChangePercentage; // Procentowa zmiana od ATH

    @Column(name = "ath_date")
    private ZonedDateTime athDate; // Data osiągnięcia ATH

    @Column(precision = 20, scale = 2)
    private BigDecimal atl; // All-Time Low (najniższa cena w historii)

    @Column(name = "atl_change_percentage", precision = 20, scale = 2)
    private BigDecimal atlChangePercentage; // Procentowa zmiana od ATL

    @Column(name = "atl_date")
    private ZonedDateTime atlDate; // Data osiągnięcia ATL

    @Column(name = "last_updated")
    private ZonedDateTime lastUpdated;

    @JsonIgnore
    @OneToMany(mappedBy = "cryptoCurrency", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Subscription> subscriptions = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "cryptoCurrency", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Alert> alerts = new HashSet<>();

    public Set<Alert> getAlerts() {
        return alerts;
    }

    public void setAlerts(Set<Alert> alerts) {
        this.alerts = alerts;
    }

    public Set<Subscription> getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(Set<Subscription> subscriptions) {
        this.subscriptions = subscriptions;
    }

    public CryptoCurrency(Long id, String cryptoId, String symbol, String name, String imageUrl, BigDecimal currentPrice, Long marketCap, Integer marketCapRank, Long fullyDilutedValuation, Long totalVolume, BigDecimal high24h, BigDecimal low24h, BigDecimal priceChange24h, BigDecimal priceChangePercentage24h, Long marketCapChange24h, BigDecimal marketCapChangePercentage24h, Long circulatingSupply, Long totalSupply, Long maxSupply, BigDecimal ath, BigDecimal athChangePercentage, ZonedDateTime athDate, BigDecimal atl, BigDecimal atlChangePercentage, ZonedDateTime atlDate, ZonedDateTime lastUpdated) {
        this.id = id;
        this.cryptoId = cryptoId;
        this.symbol = symbol;
        this.name = name;
        this.imageUrl = imageUrl;
        this.currentPrice = currentPrice;
        this.marketCap = marketCap;
        this.marketCapRank = marketCapRank;
        this.fullyDilutedValuation = fullyDilutedValuation;
        this.totalVolume = totalVolume;
        this.high24h = high24h;
        this.low24h = low24h;
        this.priceChange24h = priceChange24h;
        this.priceChangePercentage24h = priceChangePercentage24h;
        this.marketCapChange24h = marketCapChange24h;
        this.marketCapChangePercentage24h = marketCapChangePercentage24h;
        this.circulatingSupply = circulatingSupply;
        this.totalSupply = totalSupply;
        this.maxSupply = maxSupply;
        this.ath = ath;
        this.athChangePercentage = athChangePercentage;
        this.athDate = athDate;
        this.atl = atl;
        this.atlChangePercentage = atlChangePercentage;
        this.atlDate = atlDate;
        this.lastUpdated = lastUpdated;
    }

    public CryptoCurrency() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCryptoId() {
        return cryptoId;
    }

    public void setCryptoId(String cryptoId) {
        this.cryptoId = cryptoId;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Long getMarketCap() {
        return marketCap;
    }

    public void setMarketCap(Long marketCap) {
        this.marketCap = marketCap;
    }

    public Integer getMarketCapRank() {
        return marketCapRank;
    }

    public void setMarketCapRank(Integer marketCapRank) {
        this.marketCapRank = marketCapRank;
    }

    public Long getFullyDilutedValuation() {
        return fullyDilutedValuation;
    }

    public void setFullyDilutedValuation(Long fullyDilutedValuation) {
        this.fullyDilutedValuation = fullyDilutedValuation;
    }

    public Long getTotalVolume() {
        return totalVolume;
    }

    public void setTotalVolume(Long totalVolume) {
        this.totalVolume = totalVolume;
    }

    public BigDecimal getHigh24h() {
        return high24h;
    }

    public void setHigh24h(BigDecimal high24h) {
        this.high24h = high24h;
    }

    public BigDecimal getLow24h() {
        return low24h;
    }

    public void setLow24h(BigDecimal low24h) {
        this.low24h = low24h;
    }

    public BigDecimal getPriceChange24h() {
        return priceChange24h;
    }

    public void setPriceChange24h(BigDecimal priceChange24h) {
        this.priceChange24h = priceChange24h;
    }

    public BigDecimal getPriceChangePercentage24h() {
        return priceChangePercentage24h;
    }

    public void setPriceChangePercentage24h(BigDecimal priceChangePercentage24h) {
        this.priceChangePercentage24h = priceChangePercentage24h;
    }

    public Long getMarketCapChange24h() {
        return marketCapChange24h;
    }

    public void setMarketCapChange24h(Long marketCapChange24h) {
        this.marketCapChange24h = marketCapChange24h;
    }

    public BigDecimal getMarketCapChangePercentage24h() {
        return marketCapChangePercentage24h;
    }

    public void setMarketCapChangePercentage24h(BigDecimal marketCapChangePercentage24h) {
        this.marketCapChangePercentage24h = marketCapChangePercentage24h;
    }

    public Long getCirculatingSupply() {
        return circulatingSupply;
    }

    public void setCirculatingSupply(Long circulatingSupply) {
        this.circulatingSupply = circulatingSupply;
    }

    public Long getTotalSupply() {
        return totalSupply;
    }

    public void setTotalSupply(Long totalSupply) {
        this.totalSupply = totalSupply;
    }

    public Long getMaxSupply() {
        return maxSupply;
    }

    public void setMaxSupply(Long maxSupply) {
        this.maxSupply = maxSupply;
    }

    public BigDecimal getAth() {
        return ath;
    }

    public void setAth(BigDecimal ath) {
        this.ath = ath;
    }

    public BigDecimal getAthChangePercentage() {
        return athChangePercentage;
    }

    public void setAthChangePercentage(BigDecimal athChangePercentage) {
        this.athChangePercentage = athChangePercentage;
    }

    public ZonedDateTime getAthDate() {
        return athDate;
    }

    public void setAthDate(ZonedDateTime athDate) {
        this.athDate = athDate;
    }

    public BigDecimal getAtl() {
        return atl;
    }

    public void setAtl(BigDecimal atl) {
        this.atl = atl;
    }

    public BigDecimal getAtlChangePercentage() {
        return atlChangePercentage;
    }

    public void setAtlChangePercentage(BigDecimal atlChangePercentage) {
        this.atlChangePercentage = atlChangePercentage;
    }

    public ZonedDateTime getAtlDate() {
        return atlDate;
    }

    public void setAtlDate(ZonedDateTime atlDate) {
        this.atlDate = atlDate;
    }

    public ZonedDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(ZonedDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
