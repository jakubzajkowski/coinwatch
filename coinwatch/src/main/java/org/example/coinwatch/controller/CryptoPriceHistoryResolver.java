package org.example.coinwatch.controller;

import org.example.coinwatch.entity.CryptoPriceHistory;
import org.example.coinwatch.respository.CryptoPriceHistoryRepository;
import org.example.coinwatch.service.CryptoPriceHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CryptoPriceHistoryResolver {
    @Autowired
    private CryptoPriceHistoryService cryptoPriceHistoryService;

    @QueryMapping
    private List<CryptoPriceHistory> getCryptoPriceHistoryByRange(@Argument String cryptoId, @Argument String range) {
        return cryptoPriceHistoryService.getByCryptoIdAndRange(cryptoId,range);
    }
}
