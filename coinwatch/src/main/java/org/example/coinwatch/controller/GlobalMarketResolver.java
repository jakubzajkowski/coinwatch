package org.example.coinwatch.controller;

import org.example.coinwatch.entity.GlobalMarket;
import org.example.coinwatch.graphql.GlobalMarketGraphqlDTO;
import org.example.coinwatch.respository.GlobalMarketRepository;
import org.example.coinwatch.service.GlobalMarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GlobalMarketResolver {
    @Autowired
    private GlobalMarketService globalMarketService;

    @QueryMapping
    public GlobalMarketGraphqlDTO getGlobalMarket(){
        return globalMarketService.getGlobalMarket();
    }
}
