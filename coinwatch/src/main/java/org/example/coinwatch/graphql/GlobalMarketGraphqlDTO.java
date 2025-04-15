package org.example.coinwatch.graphql;

import java.util.List;

public class GlobalMarketGraphqlDTO {
        private Long id;
        private int activeCryptocurrencies;
        private int upcomingIcos;
        private int ongoingIcos;
        private int endedIcos;
        private int markets;
        private List<CurrencyValue> totalMarketCap;
        private List<CurrencyValue> totalVolume;
        private List<CurrencyProcentage> marketCapPercentage;
        private double marketCapChangePercentage24hUsd;
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

    public List<CurrencyValue> getTotalMarketCap() {
        return totalMarketCap;
    }

    public void setTotalMarketCap(List<CurrencyValue> totalMarketCap) {
        this.totalMarketCap = totalMarketCap;
    }

    public List<CurrencyValue> getTotalVolume() {
        return totalVolume;
    }

    public void setTotalVolume(List<CurrencyValue> totalVolume) {
        this.totalVolume = totalVolume;
    }

    public List<CurrencyProcentage> getMarketCapPercentage() {
        return marketCapPercentage;
    }

    public void setMarketCapPercentage(List<CurrencyProcentage> marketCapPercentage) {
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
