package org.example.coinwatch;

import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.dto.GlobalMarketDTO;
import org.example.coinwatch.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CoinGeckoScheduler {
    private static final Logger logger = LoggerFactory.getLogger(CoinGeckoScheduler.class);

    @Autowired
    private CoinGeckoService coinGeckoService;

    @Autowired
    private GlobalMarketService globalMarketService;

    @Autowired
    private CryptoAlertsService cryptoAlertsService;

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
            cryptoAlertsService.monitorPriceChanges();
            for (CryptoCurrencyDTO dto : cryptoCurrencyDTOS){
                cryptoCurrencyService.saveOrUpdate(dto);
                cryptoPriceHistoryService.saveCurrencyPrice(dto);
            }
        }catch (Exception e){
            logger.error("Error in CoinGeckoScheduler: ", e);
        }

        logger.info("Finished scheduled task: saveUpdateGeckoCryptoCurrency");
    }

    @Async
    @Scheduled(fixedRateString = "3600000")
    public void saveUpdateGeckoGlobalMarket(){
        logger.info("Starting scheduled task: saveUpdateGeckoGlobalMarket");
        GlobalMarketDTO globalMarketDTO = coinGeckoService.getGlobalMarket();

        globalMarketService.saveGlobalMarketData(globalMarketDTO);
    }
}
