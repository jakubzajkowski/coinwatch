package org.example.coinwatch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class GlobalMarketDTO {

    @JsonProperty("data")
    private Data data;

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public static class Data {

        @JsonProperty("active_cryptocurrencies")
        private int activeCryptocurrencies;

        @JsonProperty("upcoming_icos")
        private int upcomingIcos;

        @JsonProperty("ongoing_icos")
        private int ongoingIcos;

        @JsonProperty("ended_icos")
        private int endedIcos;

        @JsonProperty("markets")
        private int markets;

        @JsonProperty("total_market_cap")
        private Map<String, Double> totalMarketCap;

        @JsonProperty("total_volume")
        private Map<String, Double> totalVolume;

        @JsonProperty("market_cap_percentage")
        private Map<String, Double> marketCapPercentage;

        @JsonProperty("market_cap_change_percentage_24h_usd")
        private double marketCapChangePercentage24hUsd;

        @JsonProperty("updated_at")
        private long updatedAt;

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
}