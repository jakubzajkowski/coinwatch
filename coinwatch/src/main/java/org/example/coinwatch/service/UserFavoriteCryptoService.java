package org.example.coinwatch.service;

import org.example.coinwatch.entity.UserFavoriteCrypto;
import org.example.coinwatch.respository.UserFavoriteCryptoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserFavoriteCryptoService {

    @Autowired
    private UserFavoriteCryptoRepository userFavoriteCryptoRepository;


    // Dodanie nowej ulubionej kryptowaluty dla użytkownika
    @Transactional
    public UserFavoriteCrypto addFavoriteCrypto(Long userId, Long cryptoCurrencyId) {
        Optional<UserFavoriteCrypto> existingFavorite = userFavoriteCryptoRepository.findByUserIdAndCryptoCurrencyId(userId, cryptoCurrencyId);
        if (existingFavorite.isPresent()) {
            throw new IllegalArgumentException("User has already added this cryptocurrency as a favorite");
        }

        UserFavoriteCrypto favorite = new UserFavoriteCrypto();
        favorite.setUserId(userId);
        favorite.setCryptoCurrencyId(cryptoCurrencyId);
        favorite.setAddedAt(ZonedDateTime.now());

        return userFavoriteCryptoRepository.save(favorite);
    }

    // Usuwanie ulubionej kryptowaluty użytkownika
    @Transactional
    public void removeFavoriteCrypto(Long userId, Long cryptoCurrencyId) {
        Optional<UserFavoriteCrypto> existingFavorite = userFavoriteCryptoRepository.findByUserIdAndCryptoCurrencyId(userId, cryptoCurrencyId);
        if (existingFavorite.isEmpty()) {
            throw new IllegalArgumentException("User has not added this cryptocurrency as a favorite");
        }
        userFavoriteCryptoRepository.delete(existingFavorite.get());
    }

    // Pobranie wszystkich ulubionych kryptowalut dla danego użytkownika
    public List<UserFavoriteCrypto> getUserFavoriteCryptos(Long userId) {
        return userFavoriteCryptoRepository.findByUserId(userId);
    }

    // Sprawdzanie, czy użytkownik ma daną kryptowalutę w swoich ulubionych
    public boolean isCryptoFavorite(Long userId, Long cryptoCurrencyId) {
        return userFavoriteCryptoRepository.findByUserIdAndCryptoCurrencyId(userId, cryptoCurrencyId).isPresent();
    }
}
