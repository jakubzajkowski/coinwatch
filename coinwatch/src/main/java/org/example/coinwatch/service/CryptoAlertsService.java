package org.example.coinwatch.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.coinwatch.kafka.producer.KafkaProducer;
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
        List<String> cryptoIds = cryptoCurrencyRepository.findAll()
                .stream()
                .map(CryptoCurrency::getCryptoId)
                .toList();

        for (String cryptoId : cryptoIds) {
            try {
                shortTermPriceChange(cryptoId);
            } catch (Exception e) {
                logger.error("Error monitoring price for symbol: " + cryptoId, e);
            }
        }
    }

    public void shortTermPriceChange(String cryptoId) throws JsonProcessingException {
        CryptoCurrency crypto = cryptoCurrencyRepository.findByCryptoId(cryptoId).orElseThrow(()-> new RuntimeException("Crypto Not found"));
        BigDecimal currentPrice = crypto.getCurrentPrice();
        BigDecimal threshold;
        int interval;

        if (currentPrice.compareTo(BigDecimal.valueOf(1)) < 0) {
            threshold = BigDecimal.valueOf(3);
            interval = 10;
        } else if (currentPrice.compareTo(BigDecimal.valueOf(100)) < 0) {
            threshold = BigDecimal.valueOf(0.3);
            interval = 3;
        } else {
            threshold = BigDecimal.valueOf(0.1);
            interval = 5;
        }

        ZonedDateTime minutesAgo = ZonedDateTime.now().minusMinutes(interval);
        List<CryptoPriceHistory> historyList = cryptoPriceHistoryRepository.findByCryptoIdAndRecordedAtAfter(cryptoId, minutesAgo);

        if (historyList.isEmpty()) {
            logger.warn("No price data for {} in the last minutes.", cryptoId);
            return;
        }

        BigDecimal oldPrice = historyList.get(0).getPrice();
        String id = historyList.get(0).getCryptoId();
        String symbol = historyList.get(0).getSymbol();
        BigDecimal price = historyList.get(historyList.size()-1).getPrice();

        BigDecimal changePercent = currentPrice.subtract(oldPrice)
                .divide(oldPrice, 4, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        if (changePercent.abs().compareTo(threshold) > 0) {
            kafkaProducer.sendPriceChangeAlert(id,symbol, changePercent, oldPrice, price);
        }
    }

}
