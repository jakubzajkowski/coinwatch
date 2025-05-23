package org.example.coinwatch.controller;

import org.example.coinwatch.dto.Direction;
import org.example.coinwatch.entity.UserCryptoTrigger;
import org.example.coinwatch.service.UserCryptoTriggersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.math.BigDecimal;

@Controller
public class UserCryptoTriggerResolver {
    @Autowired
    private UserCryptoTriggersService userCryptoTriggersService;

    @MutationMapping
    public UserCryptoTrigger createUserCryptoTrigger(@Argument Long userId, @Argument Long cryptoCurrencyId, @Argument BigDecimal targetPrice,@Argument Direction direction){
        return userCryptoTriggersService.createTrigger(userId, cryptoCurrencyId, targetPrice, direction);
    }
}
