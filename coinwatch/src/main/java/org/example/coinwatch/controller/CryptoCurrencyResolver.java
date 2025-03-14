package org.example.coinwatch.controller;

import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.example.coinwatch.service.CryptoCurrencyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class CryptoCurrencyResolver {
    private static final Logger logger = LoggerFactory.getLogger(CryptoCurrencyResolver.class);

    @Autowired
    private CryptoCurrencyRepository cryptoCurrencyRepository;

    @QueryMapping
    public List<CryptoCurrency> getCryptoCurrencies(
            @Argument int limit,
            @Argument String orderBy
    ){
        List<String> allowedFields = List.of("currentPrice", "marketCap", "priceChangePercentage24h","cryptoId","id");
        if (!allowedFields.contains(orderBy)) {
            logger.error("Invalid field for sorting: {}", orderBy);
            throw new IllegalArgumentException("Invalid sorting field: " + orderBy);
        }

        Sort sort = Sort.by(Sort.Order.asc(orderBy));
        Pageable pageable = PageRequest.of(0, limit, sort);

        return cryptoCurrencyRepository.findAll(pageable).getContent();
    }
    @QueryMapping
    public CryptoCurrency getCryptoCurrencyByCryptoId(@Argument String cryptoId){
        Optional<CryptoCurrency> cryptoCurrency = cryptoCurrencyRepository.findByCryptoId(cryptoId);

        if (cryptoCurrency.isEmpty()) {
            logger.error("CryptoCurrency with cryptoId: {} not found", cryptoId);
        }

        return cryptoCurrency.get();
    }

}
