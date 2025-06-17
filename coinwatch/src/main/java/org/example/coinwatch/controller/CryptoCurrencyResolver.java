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
            @Argument Optional<String> orderBy,
            @Argument Optional<String> order
    ){
        int finalLimit = limit.orElse(Integer.MAX_VALUE);
      return cryptoCurrencyService.getCryptoCurrencies(orderBy.orElse(null),finalLimit,order.orElse("asc"));
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
    public CryptoCurrencyPage paginateCryptoCurrencies(
            @Argument int page,
            @Argument int size,
            @Argument String sort,
            @Argument String order,
            @Argument Optional<Double> minPrice,
            @Argument Optional<Double> maxPrice,
            @Argument Optional<Double> minMarketCap,
            @Argument Optional<Double> maxMarketCap,
            @Argument Optional<Double> minPriceChange24h,
            @Argument Optional<Double> maxPriceChange24h,
            @Argument Optional<Double> minHighestPrice24h,
            @Argument Optional<Double> maxHighestPrice24h,
            @Argument Optional<Double> minLowestPrice24h,
            @Argument Optional<Double> maxLowestPrice24h
    ) {
        Pageable pageable = PageRequest.of(page, size, "asc".equals(order) ? Sort.by(sort).ascending() : Sort.by(sort).descending());
        Page<CryptoCurrency> cryptoCurrencyPage = cryptoCurrencyRepository.findAllWithFilters(
                minPrice.orElse(null),
                maxPrice.orElse(null),
                minMarketCap.orElse(null),
                maxMarketCap.orElse(null),
                minPriceChange24h.orElse(null),
                maxPriceChange24h.orElse(null),
                minHighestPrice24h.orElse(null),
                maxHighestPrice24h.orElse(null),
                minLowestPrice24h.orElse(null),
                maxLowestPrice24h.orElse(null),
                pageable
        );

        return new CryptoCurrencyPage(
                cryptoCurrencyPage.getContent(),
                cryptoCurrencyPage.getTotalPages(),
                cryptoCurrencyPage.getTotalElements(),
                cryptoCurrencyPage.getNumber()
        );
    }
}
