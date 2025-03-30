package org.example.coinwatch.service;

import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.Subscription;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.example.coinwatch.respository.SubscriptionRepository;
import org.example.coinwatch.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CryptoCurrencyRepository cryptoCurrencyRepository;

    public Subscription addSubscription(Long userId, Long cryptoId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        CryptoCurrency cryptoCurrency = cryptoCurrencyRepository.findById(cryptoId).orElseThrow(() -> new RuntimeException("CryptoCurrency not found"));

        Subscription subscription = new Subscription(user, cryptoCurrency);
        return subscriptionRepository.save(subscription);
    }
}
