package org.example.coinwatch.entity;

import jakarta.persistence.*;

import java.util.Map;

@Entity
@Table(name = "global_market")
public class GlobalMarket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "active_cryptocurrencies")
    private int activeCryptocurrencies;

    @Column(name = "upcoming_icos")
    private int upcomingIcos;

    @Column(name = "ongoing_icos")
    private int ongoingIcos;

    @Column(name = "ended_icos")
    private int endedIcos;

    @Column(name = "markets")
    private int markets;

    @ElementCollection
    @CollectionTable(name = "total_market_cap", joinColumns = @JoinColumn(name = "global_market_id"))
    @MapKeyColumn(name = "currency")
    @Column(name = "amount")
    private Map<String, Double> totalMarketCap;

    @ElementCollection
    @CollectionTable(name = "total_volume", joinColumns = @JoinColumn(name = "global_market_id"))
    @MapKeyColumn(name = "currency")
    @Column(name = "amount")
    private Map<String, Double> totalVolume;

    @ElementCollection
    @CollectionTable(name = "market_cap_percentage", joinColumns = @JoinColumn(name = "global_market_id"))
    @MapKeyColumn(name = "currency")
    @Column(name = "percentage")
    private Map<String, Double> marketCapPercentage;

    @Column(name = "market_cap_change_percentage_24h_usd")
    private double marketCapChangePercentage24hUsd;

    @Column(name = "updated_at")
    private long updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getActiveCryptocurrencies() {
        return activeCryptocurrencies;
    }

    public void setActiveCryptocurrencies(int activeCryptocurrencies) {
        this.activeCryptocurrencies = activeCryptocurrencies;
    }

    public int getUpcomingIcos() {
        return upcomingIcos;
    }

    public void setUpcomingIcos(int upcomingIcos) {
        this.upcomingIcos = upcomingIcos;
    }

    public int getOngoingIcos() {
        return ongoingIcos;
    }

    public void setOngoingIcos(int ongoingIcos) {
        this.ongoingIcos = ongoingIcos;
    }

    public int getEndedIcos() {
        return endedIcos;
    }

    public void setEndedIcos(int endedIcos) {
        this.endedIcos = endedIcos;
    }

    public int getMarkets() {
        return markets;
    }

    public void setMarkets(int markets) {
        this.markets = markets;
    }

    public Map<String, Double> getTotalMarketCap() {
        return totalMarketCap;
    }

    public void setTotalMarketCap(Map<String, Double> totalMarketCap) {
        this.totalMarketCap = totalMarketCap;
    }

    public Map<String, Double> getTotalVolume() {
        return totalVolume;
    }

    public void setTotalVolume(Map<String, Double> totalVolume) {
        this.totalVolume = totalVolume;
    }

    public Map<String, Double> getMarketCapPercentage() {
        return marketCapPercentage;
    }

    public void setMarketCapPercentage(Map<String, Double> marketCapPercentage) {
        this.marketCapPercentage = marketCapPercentage;
    }

    public double getMarketCapChangePercentage24hUsd() {
        return marketCapChangePercentage24hUsd;
    }

    public void setMarketCapChangePercentage24hUsd(double marketCapChangePercentage24hUsd) {
        this.marketCapChangePercentage24hUsd = marketCapChangePercentage24hUsd;
    }

    public long getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(long updatedAt) {
        this.updatedAt = updatedAt;
    }
}
