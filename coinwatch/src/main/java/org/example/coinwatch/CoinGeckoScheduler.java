package org.example.coinwatch;

import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.service.CoinGeckoService;
import org.example.coinwatch.service.CryptoCurrencyService;
import org.example.coinwatch.service.CryptoPriceHistoryService;
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

@Component
public class CoinGeckoScheduler {
    private static final Logger logger = LoggerFactory.getLogger(CoinGeckoScheduler.class);

    @Autowired
    private CoinGeckoService coinGeckoService;

    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    private CryptoCurrencyService cryptoCurrencyService;

    @Autowired
    private CryptoPriceHistoryService cryptoPriceHistoryService;

    @Async
    @Scheduled(fixedRateString = "${scheduler.interval}")
    public void saveUpdateGeckoCryptoCurrency(){
        logger.info("Starting scheduled task: saveUpdateGeckoCryptoCurrency");
        try {
            List<CryptoCurrencyDTO> cryptoCurrencyDTOS = coinGeckoService.getCryptoCurrencies();
            cryptoPriceHistoryService.monitorPriceChanges();
            for (CryptoCurrencyDTO dto : cryptoCurrencyDTOS){
                cryptoCurrencyService.saveOrUpdate(dto);
                cryptoPriceHistoryService.saveCyrrencyPrice(dto);
            }
        }catch (Exception e){
            logger.error("Error in CoinGeckoScheduler: ", e);
        }

        logger.info("Finished scheduled task: saveUpdateGeckoCryptoCurrency");
    }
}
