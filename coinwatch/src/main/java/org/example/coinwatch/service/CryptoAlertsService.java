package org.example.coinwatch.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.coinwatch.KafkaProducer;
import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.CryptoPriceHistory;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.example.coinwatch.respository.CryptoPriceHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CryptoAlertsService {
    private static final Logger logger = LoggerFactory.getLogger(CryptoAlertsService.class);

    @Autowired
    private CryptoPriceHistoryRepository cryptoPriceHistoryRepository;

    @Autowired
    private CryptoCurrencyRepository cryptoCurrencyRepository;

    @Autowired
    private KafkaProducer kafkaProducer;

    public void monitorPriceChanges() {
        List<String> cryptoSymbols = cryptoCurrencyRepository.findAll()
                .stream()
                .map(CryptoCurrency::getSymbol)
                .toList();

        for (String symbol : cryptoSymbols) {
            try {
                shortTermTrendChange(symbol);
            } catch (Exception e) {
                logger.error("Error monitoring price for symbol: " + symbol, e);
            }
        }
    }

    public void shortTermTrendChange(String symbol) throws JsonProcessingException {
        ZonedDateTime fiveMinutesAgo = ZonedDateTime.now().minusMinutes(5);
        List<CryptoPriceHistory> historyList = cryptoPriceHistoryRepository.findBySymbolAndRecordedAtAfter(symbol, fiveMinutesAgo);

        if (historyList.isEmpty()) {
            logger.warn("No price data for {} in the last 5 minutes.", symbol);
            return;
        }

        BigDecimal oldPrice = historyList.get(0).getPrice();
        BigDecimal currentPrice = historyList.get(historyList.size()-1).getPrice();
        BigDecimal changePercent = currentPrice.subtract(oldPrice)
                .divide(oldPrice, 4, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        if (changePercent.abs().compareTo(BigDecimal.valueOf(0.01)) > 0) {
            kafkaProducer.sendPriceChangeAlert(symbol, changePercent, oldPrice, currentPrice);
        }
    }

}
