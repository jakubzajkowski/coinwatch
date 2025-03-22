package org.example.coinwatch.dto;

public enum Interest {
    BITCOIN, TRADING, ETHEREUM, MINING, DEFI, STAKING, NFTS, NEWS;

    public static Interest fromString(String value) {
        for (Interest interest : Interest.values()) {
            if (interest.name().equalsIgnoreCase(value)) {
                return interest;
            }
        }
        throw new IllegalArgumentException("Invalid type of interest: " + value);
    }
}
