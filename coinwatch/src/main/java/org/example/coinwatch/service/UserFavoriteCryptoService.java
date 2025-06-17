package org.example.coinwatch.service;

import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.entity.UserFavoriteCrypto;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.example.coinwatch.respository.UserFavoriteCryptoRepository;
import org.example.coinwatch.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserFavoriteCryptoService {

    @Autowired
    private UserFavoriteCryptoRepository userFavoriteCryptoRepository;

    @Autowired
    private CryptoCurrencyRepository cryptoCurrencyRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public UserFavoriteCrypto addFavoriteCrypto(Long userId, Long cryptoCurrencyId) {
        Optional<UserFavoriteCrypto> existingFavorite = userFavoriteCryptoRepository.findByUserIdAndCryptoCurrencyId(userId, cryptoCurrencyId);
        if (existingFavorite.isPresent()) {
            throw new IllegalArgumentException("User has already added this cryptocurrency as a favorite");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        CryptoCurrency cryptoCurrency = cryptoCurrencyRepository.findById(cryptoCurrencyId)
                .orElseThrow(() -> new IllegalArgumentException("CryptoCurrency not found"));

        UserFavoriteCrypto favorite = new UserFavoriteCrypto();
        favorite.setUser(user);
        favorite.setCryptoCurrency(cryptoCurrency);
        favorite.setAddedAt(ZonedDateTime.now());

        return userFavoriteCryptoRepository.save(favorite);
    }

    @Transactional
    public void removeFavoriteCrypto(Long userId, Long cryptoCurrencyId) {
        Optional<UserFavoriteCrypto> existingFavorite = userFavoriteCryptoRepository.findByUserIdAndCryptoCurrencyId(userId, cryptoCurrencyId);
        if (existingFavorite.isEmpty()) {
            throw new IllegalArgumentException("User has not added this cryptocurrency as a favorite");
        }
        userFavoriteCryptoRepository.delete(existingFavorite.get());
    }

    public List<UserFavoriteCrypto> getUserFavoriteCryptos(Long userId) {
        return userFavoriteCryptoRepository.findByUserId(userId);
    }

    public boolean isCryptoFavorite(Long userId, Long cryptoCurrencyId) {
        return userFavoriteCryptoRepository.findByUserIdAndCryptoCurrencyId(userId, cryptoCurrencyId).isPresent();
    }
}
