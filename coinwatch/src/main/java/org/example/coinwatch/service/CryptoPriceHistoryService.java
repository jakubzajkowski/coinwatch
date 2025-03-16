package org.example.coinwatch.service;

import jakarta.transaction.Transactional;
import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.entity.CryptoPriceHistory;
import org.example.coinwatch.respository.CryptoPriceHistoryRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class CryptoPriceHistoryService {
    @Autowired
    private CryptoPriceHistoryRespository cryptoPriceHistoryRespository;

    @Transactional
    public void saveCyrrencyPrice(CryptoCurrencyDTO cryptoCurrencyDTO){
        CryptoPriceHistory cryptoPriceHistory = new CryptoPriceHistory(
                cryptoCurrencyDTO.getId(),
                cryptoCurrencyDTO.getSymbol(),
                cryptoCurrencyDTO.getCurrentPrice()
        );
        cryptoPriceHistoryRespository.save(cryptoPriceHistory);
    }
}
