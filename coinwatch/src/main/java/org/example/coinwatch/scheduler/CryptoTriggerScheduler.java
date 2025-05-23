package org.example.coinwatch.scheduler;

import org.example.coinwatch.dto.Direction;
import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.UserCryptoTrigger;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.example.coinwatch.respository.UserCryptoTriggerRepository;
import org.example.coinwatch.service.UserCryptoTriggersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class CryptoTriggerScheduler {
    private final Logger logger = LoggerFactory.getLogger(CryptoTriggerScheduler.class);

    @Autowired
    private CryptoCurrencyRepository cryptoCurrencyRepository;

    @Autowired
    private UserCryptoTriggersService userCryptoTriggersService;

    @Autowired
    private UserCryptoTriggerRepository userCryptoTriggerRepository;

    @Async
    @Scheduled(fixedDelay = 60000)
    public void evaluateTriggers() {
        List<CryptoCurrency> cryptos = cryptoCurrencyRepository.findAll();

        for (CryptoCurrency crypto : cryptos) {
            BigDecimal currentPrice = crypto.getCurrentPrice();
            List<UserCryptoTrigger> triggers = userCryptoTriggersService.getByCryptoCurrencyAndTriggeredFalse(crypto);

            for (UserCryptoTrigger trigger : triggers) {
                if (shouldTrigger(trigger, currentPrice)) {
                    trigger.setTriggered(true);
                    logger.info("Trigger triggered: {}", trigger.getCryptoCurrency().getCryptoId());
                    userCryptoTriggerRepository.save(trigger);
                }
            }
        }
    }

    private boolean shouldTrigger(UserCryptoTrigger trigger, BigDecimal price) {
        return switch (trigger.getDirection()) {
            case Direction.ABOVE -> price.compareTo(trigger.getTargetPrice()) >= 0;
            case Direction.BELOW -> price.compareTo(trigger.getTargetPrice()) <= 0;
        };
    }
}
