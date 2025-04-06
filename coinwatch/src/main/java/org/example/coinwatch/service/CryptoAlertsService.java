package org.example.coinwatch.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.coinwatch.kafka.KafkaProducer;
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
                shortTermTrendChange(cryptoId);
            } catch (Exception e) {
                logger.error("Error monitoring price for symbol: " + cryptoId, e);
            }
        }
    }

    public void shortTermTrendChange(String cryptoId) throws JsonProcessingException {
        ZonedDateTime minutesAgo = ZonedDateTime.now().minusMinutes(15);
        List<CryptoPriceHistory> historyList = cryptoPriceHistoryRepository.findByCryptoIdAndRecordedAtAfter(cryptoId, minutesAgo);

        if (historyList.isEmpty()) {
            logger.warn("No price data for {} in the last 5 minutes.", cryptoId);
            return;
        }

        BigDecimal oldPrice = historyList.get(0).getPrice();
        String id = historyList.get(0).getCryptoId();
        String symbol = historyList.get(0).getSymbol();
        BigDecimal currentPrice = historyList.get(historyList.size()-1).getPrice();

        BigDecimal changePercent = currentPrice.subtract(oldPrice)
                .divide(oldPrice, 4, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        if (changePercent.abs().compareTo(BigDecimal.valueOf(0.01)) > 0) {
            kafkaProducer.sendPriceChangeAlert(id,symbol, changePercent, oldPrice, currentPrice);
        }
    }

}
