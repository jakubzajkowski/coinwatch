package org.example.coinwatch.controller;

import org.example.coinwatch.entity.UserFavoriteCrypto;
import org.example.coinwatch.service.UserFavoriteCryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserFavoriteCryptoResolver {
    @Autowired
    private UserFavoriteCryptoService userFavoriteCryptoService;

    @MutationMapping
    public UserFavoriteCrypto addFavoriteCrypto(@Argument Long userId, @Argument Long cryptoCurrencyId) {
        return userFavoriteCryptoService.addFavoriteCrypto(userId, cryptoCurrencyId);
    }

    @MutationMapping
    public Boolean removeFavoriteCrypto(@Argument Long userId, @Argument Long cryptoCurrencyId) {
        userFavoriteCryptoService.removeFavoriteCrypto(userId, cryptoCurrencyId);
        return true;
    }

    @QueryMapping
    public List<UserFavoriteCrypto> getUserFavoriteCryptos(@Argument Long userId) {
        return userFavoriteCryptoService.getUserFavoriteCryptos(userId);
    }

    @QueryMapping
    public boolean isCryptoFavorite(@Argument Long userId, @Argument Long cryptoCurrencyId) {
        return userFavoriteCryptoService.isCryptoFavorite(userId, cryptoCurrencyId);
    }
}
