package org.example.coinwatch.service;

import jakarta.transaction.Transactional;
import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.entity.CryptoPriceHistory;
import org.example.coinwatch.respository.CryptoPriceHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CryptoPriceHistoryService {
    private static final Logger logger = LoggerFactory.getLogger(CryptoPriceHistoryService.class);
    @Autowired
    private CryptoPriceHistoryRepository cryptoPriceHistoryRepository;

    @Transactional
    public void saveCyrrencyPrice(CryptoCurrencyDTO cryptoCurrencyDTO){
        CryptoPriceHistory cryptoPriceHistory = new CryptoPriceHistory(
                cryptoCurrencyDTO.getId(),
                cryptoCurrencyDTO.getSymbol(),
                cryptoCurrencyDTO.getCurrentPrice()
        );
        cryptoPriceHistoryRepository.save(cryptoPriceHistory);
    }
}
