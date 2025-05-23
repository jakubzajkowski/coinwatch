package org.example.coinwatch.service;


import org.example.coinwatch.dto.Direction;
import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.entity.UserCryptoTrigger;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.example.coinwatch.respository.UserCryptoTriggerRepository;
import org.example.coinwatch.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class UserCryptoTriggersService {
    @Autowired
    private UserCryptoTriggerRepository userCryptoTriggerRepository;
    @Autowired
    private CryptoCurrencyRepository cryptoRepository;
    @Autowired
    private UserRepository userRepository;

    public UserCryptoTrigger createTrigger(Long userId, Long cryptoCurrencyId, BigDecimal targetPrice, Direction direction) {
        User user = userRepository.findById(userId).orElseThrow();
        CryptoCurrency crypto = cryptoRepository.findById(cryptoCurrencyId).orElseThrow();

        UserCryptoTrigger trigger = new UserCryptoTrigger();
        trigger.setUser(user);
        trigger.setCryptoCurrency(crypto);
        trigger.setTargetPrice(targetPrice);
        trigger.setDirection(direction);
        trigger.setTriggered(false);

        return userCryptoTriggerRepository.save(trigger);
    }
    public List<UserCryptoTrigger> getTriggersForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return userCryptoTriggerRepository.findAllByUser(user).orElseThrow(()->new RuntimeException("No triggers for user"));
    }

    public void deleteTrigger(Long triggerId) {
        userCryptoTriggerRepository.deleteById(triggerId);
    }
    public List<UserCryptoTrigger> getByCryptoCurrencyAndTriggeredFalse(CryptoCurrency cryptoCurrency) {
        return userCryptoTriggerRepository.findByCryptoCurrencyAndTriggeredFalse(cryptoCurrency).orElseThrow(()->new RuntimeException("No triggers for crypto currency "));
    }
}
