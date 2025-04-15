package org.example.coinwatch.graphql;

public class CurrencyProcentage {

    private String currency;
    private double procentage;

    public CurrencyProcentage(String currency, double procentage) {
        this.currency = currency;
        this.procentage = procentage;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getProcentage() {
        return procentage;
    }

    public void setProcentage(double procentage) {
        this.procentage = procentage;
    }
}
