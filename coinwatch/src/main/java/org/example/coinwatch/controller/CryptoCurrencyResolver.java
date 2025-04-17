package org.example.coinwatch.controller;

import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.CryptoPriceHistory;
import org.example.coinwatch.page.CryptoCurrencyPage;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.example.coinwatch.respository.CryptoPriceHistoryRepository;
import org.example.coinwatch.service.CryptoCurrencyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @Autowired
    private CryptoCurrencyService cryptoCurrencyService;

    @Autowired
    private CryptoPriceHistoryRepository cryptoPriceHistoryRepository;

    @QueryMapping
    public List<CryptoCurrency> getCryptoCurrencies(
            @Argument Optional<Integer> limit,
            @Argument Optional<String> orderBy
    ){
        int finalLimit = limit.orElse(Integer.MAX_VALUE);
      return cryptoCurrencyService.getCryptoCurrencies(orderBy.orElse(null),finalLimit);
    }

    @QueryMapping
    public CryptoCurrency getCryptoCurrencyByCryptoId(@Argument String cryptoId){
       return cryptoCurrencyService.getCryptoCurrencyById(cryptoId);
    }

    @QueryMapping
    public List<CryptoPriceHistory> getCryptoPriceHistory(@Argument String cryptoId){
        return cryptoPriceHistoryRepository.findByCryptoIdOrderByRecordedAtAsc(cryptoId);
    }

    @QueryMapping
    public List<CryptoCurrency> searchCryptoCurrencyByCryptoId(@Argument String cryptoId){
        return cryptoCurrencyService.searchCryptoCurrencies(cryptoId);
    }

    @QueryMapping
    public CryptoCurrencyPage paginateCryptoCurrencies(@Argument int page, @Argument int size, @Argument String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).ascending());
        Page<CryptoCurrency> cryptoCurrencyPage = cryptoCurrencyRepository.findAll(pageable);

        return new CryptoCurrencyPage(
                cryptoCurrencyPage.getContent(),
                cryptoCurrencyPage.getTotalPages(),
                cryptoCurrencyPage.getTotalElements(),
                cryptoCurrencyPage.getNumber()
        );
    }
}
