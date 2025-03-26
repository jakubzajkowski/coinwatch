package org.example.coinwatch.service;

import jakarta.transaction.Transactional;
import org.example.coinwatch.KafkaProducer;
import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.entity.CryptoPriceHistory;
import org.example.coinwatch.respository.CryptoPriceHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class CryptoPriceHistoryService {
    private static final Logger logger = LoggerFactory.getLogger(CryptoPriceHistoryService.class);
    private final List<String> cryptoSymbols = List.of("btc", "eth", "usdt", "xrp");
    @Autowired
    private CryptoPriceHistoryRepository cryptoPriceHistoryRepository;

    @Autowired
    private KafkaProducer kafkaProducer;

    @Transactional
    public void saveCyrrencyPrice(CryptoCurrencyDTO cryptoCurrencyDTO){
        CryptoPriceHistory cryptoPriceHistory = new CryptoPriceHistory(
                cryptoCurrencyDTO.getId(),
                cryptoCurrencyDTO.getSymbol(),
                cryptoCurrencyDTO.getCurrentPrice()
        );
        cryptoPriceHistoryRepository.save(cryptoPriceHistory);
    }

    public void monitorPriceChanges() {
        for (String symbol : cryptoSymbols) {
            try {
                shortTermTrendChange(symbol);
            } catch (Exception e) {
                logger.error("Error monitoring price for symbol: " + symbol, e);
            }
        }
    }

    public void shortTermTrendChange(String symbol) {
        ZonedDateTime fiveMinutesAgo = ZonedDateTime.now().minusMinutes(5);
        List<CryptoPriceHistory> historyList = cryptoPriceHistoryRepository.findBySymbolAndRecordedAtAfter(symbol, fiveMinutesAgo);

        if (historyList.isEmpty()) {
            logger.warn("No price data for " + symbol + " in the last 5 minutes.");
            return;
        }

        BigDecimal oldPrice = historyList.get(0).getPrice();
        BigDecimal currentPrice = historyList.get(historyList.size()-1).getPrice();
        BigDecimal changePercent = currentPrice.subtract(oldPrice)
                .divide(oldPrice, 4, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        if (changePercent.abs().compareTo(BigDecimal.valueOf(0.01)) > 0) {
            String alertMessage = String.format(
                    "📈 TREND ALERT: %s zmienił się o %.2f%% w ciągu 5 min! (stara: %s, nowa: %s)",
                    symbol, changePercent, oldPrice, currentPrice
            );
            kafkaProducer.sendAlert(symbol, alertMessage);
        }
    }
}
