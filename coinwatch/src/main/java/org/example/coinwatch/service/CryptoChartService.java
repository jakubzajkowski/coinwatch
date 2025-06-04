package org.example.coinwatch.service;

import org.example.coinwatch.dto.AveragePricesDTO;
import org.example.coinwatch.dto.CandleChartDTO;
import org.example.coinwatch.dto.ChartType;
import org.example.coinwatch.respository.CryptoPriceHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class CryptoChartService {

    private static final Logger logger = LoggerFactory.getLogger(CryptoChartService.class);

    @Autowired
    CryptoPriceHistoryRepository cryptoPriceHistoryRepository;

    public List<CandleChartDTO> getCandleChartData(String cryptoId, String interval, ZonedDateTime from, ZonedDateTime to) {
        return cryptoPriceHistoryRepository.findCandleChart(interval, cryptoId, from, to)
                .orElseThrow(() -> new RuntimeException("No candle data"));
    }

    public List<AveragePricesDTO> getAveragePriceChartData(String cryptoId, String interval, ZonedDateTime from, ZonedDateTime to) {
        return cryptoPriceHistoryRepository.findAveragePrices(interval, cryptoId, from, to)
                .orElseThrow(() -> new RuntimeException("No average price data"));
    }

    public List<?> getChartData(String cryptoId, String interval, ZonedDateTime from, ZonedDateTime to, ChartType chartType) {
        switch (chartType) {
            case CANDLE:
                return getCandleChartData(cryptoId, interval, from, to);
            case LINE:
            case BAR:
                return getAveragePriceChartData(cryptoId, interval, from, to);
            default:
                throw new IllegalArgumentException("Unsupported chart type");
        }
    }
}
