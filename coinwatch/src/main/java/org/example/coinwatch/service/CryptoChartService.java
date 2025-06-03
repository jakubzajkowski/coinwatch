package org.example.coinwatch.service;

import org.example.coinwatch.dto.CandleChartDTO;
import org.example.coinwatch.respository.CryptoPriceHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.ZonedDateTime;
import java.util.List;

public class CryptoChartService {

    @Autowired
    CryptoPriceHistoryRepository cryptoPriceHistoryRepository;

    public List<CandleChartDTO> getCandleChart(String cryptoId, String interval, ZonedDateTime from, ZonedDateTime to) {

        return cryptoPriceHistoryRepository.findCandleChart(interval, cryptoId, from, to).orElseThrow(() -> new RuntimeException("Something wrong with candle chart"));
    }
}
