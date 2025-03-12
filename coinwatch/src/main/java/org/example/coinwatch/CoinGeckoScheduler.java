package org.example.coinwatch;

import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.dto.CryptoPriceDTO;
import org.example.coinwatch.entity.CryptoPrice;
import org.example.coinwatch.respository.CryptoPriceRepository;
import org.example.coinwatch.service.CoinGeckoService;
import org.example.coinwatch.service.CryptoCurrencyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@EnableScheduling
@Component
public class CoinGeckoScheduler {
    private static final Logger logger = LoggerFactory.getLogger(CoinGeckoScheduler.class);

    @Autowired
    private CoinGeckoService coinGeckoService;

    @Autowired
    private CryptoPriceRepository cryptoPriceRepository;

    @Autowired
    private CryptoCurrencyService cryptoCurrencyService;

    @Async
    @Scheduled(fixedRateString = "${scheduler.interval}")
    public void saveUpdateGeckoCryptoCurrency(){
        logger.info("Starting scheduled task: saveUpdateGeckoCryptoCurrency");
        try {
            List<CryptoCurrencyDTO> cryptoCurrencyDTOS = coinGeckoService.getCryptoCurrencies();

            for (CryptoCurrencyDTO dto : cryptoCurrencyDTOS){
                cryptoCurrencyService.saveOrUpdate(dto);
            }
        }catch (Exception e){
            logger.error("Error in CoinGeckoScheduler: ", e);
        }

        logger.info("Finished scheduled task: saveUpdateGeckoCryptoCurrency");
    }
}
