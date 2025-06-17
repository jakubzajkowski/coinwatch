package org.example.coinwatch.service;

import jakarta.transaction.Transactional;
import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CryptoCurrencyService {
    private final Logger logger = LoggerFactory.getLogger(CryptoCurrencyService.class);

    @Autowired
    private CryptoCurrencyRepository cryptoCurrencyRepository;

    @Autowired
    private CacheManager cacheManager;

    @Transactional
    public void saveOrUpdate(CryptoCurrencyDTO dto) {
        CryptoCurrency cryptoCurrency = new CryptoCurrency();
        cryptoCurrency.setCryptoId(dto.getId());
        cryptoCurrency.setSymbol(dto.getSymbol());
        cryptoCurrency.setName(dto.getName());
        cryptoCurrency.setImageUrl(dto.getImage());
        cryptoCurrency.setCurrentPrice(dto.getCurrentPrice());
        cryptoCurrency.setMarketCap(dto.getMarketCap());
        cryptoCurrency.setMarketCapRank(dto.getMarketCapRank());
        cryptoCurrency.setFullyDilutedValuation(dto.getFullyDilutedValuation());
        cryptoCurrency.setTotalVolume(dto.getTotalVolume());
        cryptoCurrency.setHigh24h(dto.getHigh24h());
        cryptoCurrency.setLow24h(dto.getLow24h());
        cryptoCurrency.setPriceChange24h(dto.getPriceChange24h());
        cryptoCurrency.setPriceChangePercentage24h(dto.getPriceChangePercentage24h());
        cryptoCurrency.setMarketCapChange24h(dto.getMarketCapChange24h());
        cryptoCurrency.setMarketCapChangePercentage24h(dto.getMarketCapChangePercentage24h());
        cryptoCurrency.setCirculatingSupply(dto.getCirculatingSupply());
        cryptoCurrency.setTotalSupply(dto.getTotalSupply());
        cryptoCurrency.setMaxSupply(dto.getMaxSupply());
        cryptoCurrency.setAth(dto.getAth());
        cryptoCurrency.setAthChangePercentage(dto.getAthChangePercentage());
        cryptoCurrency.setAthDate(ZonedDateTime.parse(dto.getAthDate()));
        cryptoCurrency.setAtl(dto.getAtl());
        cryptoCurrency.setAtlChangePercentage(dto.getAtlChangePercentage());
        cryptoCurrency.setAtlDate(ZonedDateTime.parse(dto.getAtlDate()));
        cryptoCurrency.setLastUpdated(ZonedDateTime.parse(dto.getLastUpdated()));


        cryptoCurrencyRepository.findByCryptoId(cryptoCurrency.getCryptoId())
                .ifPresentOrElse(
                        existingCrypto -> {
                            existingCrypto.setSymbol(cryptoCurrency.getSymbol());
                            existingCrypto.setName(cryptoCurrency.getName());
                            existingCrypto.setImageUrl(cryptoCurrency.getImageUrl());
                            existingCrypto.setCurrentPrice(cryptoCurrency.getCurrentPrice());
                            existingCrypto.setMarketCap(cryptoCurrency.getMarketCap());
                            existingCrypto.setMarketCapRank(cryptoCurrency.getMarketCapRank());
                            existingCrypto.setFullyDilutedValuation(cryptoCurrency.getFullyDilutedValuation());
                            existingCrypto.setTotalVolume(cryptoCurrency.getTotalVolume());
                            existingCrypto.setHigh24h(cryptoCurrency.getHigh24h());
                            existingCrypto.setLow24h(cryptoCurrency.getLow24h());
                            existingCrypto.setPriceChange24h(cryptoCurrency.getPriceChange24h());
                            existingCrypto.setPriceChangePercentage24h(cryptoCurrency.getPriceChangePercentage24h());
                            existingCrypto.setMarketCapChange24h(cryptoCurrency.getMarketCapChange24h());
                            existingCrypto.setMarketCapChangePercentage24h(cryptoCurrency.getMarketCapChangePercentage24h());
                            existingCrypto.setCirculatingSupply(cryptoCurrency.getCirculatingSupply());
                            existingCrypto.setTotalSupply(cryptoCurrency.getTotalSupply());
                            existingCrypto.setMaxSupply(cryptoCurrency.getMaxSupply());
                            existingCrypto.setAth(cryptoCurrency.getAth());
                            existingCrypto.setAthChangePercentage(cryptoCurrency.getAthChangePercentage());
                            existingCrypto.setAthDate(cryptoCurrency.getAthDate());
                            existingCrypto.setAtl(cryptoCurrency.getAtl());
                            existingCrypto.setAtlChangePercentage(cryptoCurrency.getAtlChangePercentage());
                            existingCrypto.setAtlDate(cryptoCurrency.getAtlDate());
                            existingCrypto.setLastUpdated(cryptoCurrency.getLastUpdated());

                            cryptoCurrencyRepository.save(existingCrypto);

                            updateCache(existingCrypto.getCryptoId(),existingCrypto);

                        },
                        () -> {
                            cryptoCurrencyRepository.save(cryptoCurrency);
                        }
                );
    }
    public void updateCache(String cryptoId,CryptoCurrency cryptoCurrency) {
        Cache cache = cacheManager.getCache("cryptocurrencies");
        if (cache != null) {
            cache.put(cryptoId,cryptoCurrency);
        }
    }

    public List<CryptoCurrency> getCryptoCurrencies(String orderBy, int limit, String order) {
        List<String> allowedFields = List.of("currentPrice", "marketCap", "priceChangePercentage24h","cryptoId","id");
        if (orderBy == null || orderBy.isBlank()) {
            logger.warn("orderBy is null or empty, using default sorting field: 'cryptoId'");
            orderBy = "cryptoId";
        }

        if (!allowedFields.contains(orderBy)) {
            logger.error("Invalid field for sorting: {}", orderBy);
            throw new IllegalArgumentException("Invalid sorting field: " + orderBy);
        }


        Sort sort = Sort.by(order.equals("desc") ? Sort.Order.desc(orderBy) : Sort.Order.asc(orderBy));
        Pageable pageable = PageRequest.of(0, limit, sort);

        return cryptoCurrencyRepository.findAll(pageable).getContent();
    }

    @Cacheable(value = "cryptocurrencies", key = "#cryptoId")
    public CryptoCurrency getCryptoCurrencyById(String cryptoId){
        return cryptoCurrencyRepository.findByCryptoId(cryptoId).orElseThrow(()->{
            logger.error("CryptoCurrency with cryptoId: {} not found", cryptoId);
            return new IllegalArgumentException("Error");
        });
    }

    public List<CryptoCurrency> searchCryptoCurrencies(String cryptoId){
        return cryptoCurrencyRepository.findByCryptoIdContainingIgnoreCase(cryptoId).orElseThrow(()->{
            logger.error("CryptoCurrency with cryptoId: {} not found", cryptoId);
            return new IllegalArgumentException("Error");
        });
    }
}
