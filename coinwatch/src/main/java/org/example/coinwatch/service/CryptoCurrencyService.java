package org.example.coinwatch.service;

import jakarta.transaction.Transactional;
import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Service
public class CryptoCurrencyService {
    @Autowired
    private CryptoCurrencyRepository cryptoCurrencyRepository;

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
                        },
                        () -> {
                            cryptoCurrencyRepository.save(cryptoCurrency);
                        }
                );
    }
}
