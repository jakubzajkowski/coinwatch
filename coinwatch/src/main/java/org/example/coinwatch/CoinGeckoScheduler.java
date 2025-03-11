package org.example.coinwatch;

import org.example.coinwatch.dto.CryptoPriceDTO;
import org.example.coinwatch.entity.CryptoPrice;
import org.example.coinwatch.respository.CryptoPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;

@EnableScheduling
@Component
public class CoinGeckoScheduler {
    @Autowired
    private CoinGeckoService coinGeckoService;

    @Autowired
    private CryptoPriceRepository cryptoPriceRepository;

    @Scheduled(fixedRate = 60000)
    public void saveUpdateGeckoPrices(){
        Map<String, CryptoPriceDTO> cryptoPriceDTOMap = coinGeckoService.getCryptoPrices();

        for (String symbol : cryptoPriceDTOMap.keySet()){
            CryptoPriceDTO dto = cryptoPriceDTOMap.get(symbol);
            if(cryptoPriceRepository.findBySymbol(symbol).isEmpty()) {
                CryptoPrice cryptoPrice = new CryptoPrice();
                cryptoPrice.setPrice(BigDecimal.valueOf(dto.getUsd()));
                cryptoPrice.setSymbol(symbol);
                cryptoPriceRepository.save(cryptoPrice);
            }
        }
    }
}
