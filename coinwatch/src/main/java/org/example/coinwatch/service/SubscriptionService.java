package org.example.coinwatch.service;

import jakarta.annotation.PostConstruct;
import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.Subscription;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.exception.SubscriptionAlreadyExistsException;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.example.coinwatch.respository.SubscriptionRepository;
import org.example.coinwatch.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CryptoCurrencyRepository cryptoCurrencyRepository;

    @Autowired
    private CacheManager cacheManager;

    public Subscription addSubscription(Long userId, Long cryptoId) {
        Optional<Subscription> existing = subscriptionRepository.findByUserIdAndCryptoCurrencyId(userId, cryptoId);

        if (existing.isPresent()) {
            throw new SubscriptionAlreadyExistsException("User subscribe already exists");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        CryptoCurrency cryptoCurrency = cryptoCurrencyRepository.findById(cryptoId).orElseThrow(() -> new RuntimeException("CryptoCurrency not found"));

        Subscription subscription = new Subscription(user, cryptoCurrency);

        updateCache(cryptoCurrency.getSymbol());
        return subscriptionRepository.save(subscription);
    }

    public boolean deleteSubscription(Long userId, Long cryptoId) {
        Subscription existing = subscriptionRepository.findByUserIdAndCryptoCurrencyId(userId, cryptoId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        subscriptionRepository.delete(existing);

        return true;
    }

    public void updateCache(String symbol) {
        Cache cache = cacheManager.getCache("cryptoSubscribers");
        if (cache != null) {
            cache.evict(symbol);
        }
    }

    public List<Subscription> getSubscriptionsByUserId(Long userId) {
        return subscriptionRepository.findSubscriptionsByUserId(userId).orElseThrow(()->new IllegalArgumentException("Subscrition not found"));
    }

    @Cacheable(value = "cryptoSubscribers", key = "#symbol")
    public List<Long> getUserIdsSubscribedTo(String symbol) {
        List<?> rawIds = userRepository.findAll().stream()
                .filter(user -> user.getSubscriptions().stream()
                        .anyMatch(s -> s.getCryptoCurrency().getSymbol().equals(symbol)))
                .map(User::getId)
                .toList();

        return rawIds.stream()
                .map(id -> {
                    if (id instanceof Integer) {
                        return ((Integer) id).longValue();
                    } else if (id instanceof Long) {
                        return (Long) id;
                    } else {
                        throw new IllegalArgumentException("Unsupported ID type in cache: " + id.getClass());
                    }
                })
                .toList();
    }
}
