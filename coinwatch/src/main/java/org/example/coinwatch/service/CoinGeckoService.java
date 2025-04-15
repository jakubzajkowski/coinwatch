package org.example.coinwatch.service;

import jakarta.annotation.PostConstruct;
import org.apache.kafka.common.protocol.types.Field;
import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.dto.GlobalMarketDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;


@Service
public class CoinGeckoService {
    private static final Logger logger = LoggerFactory.getLogger(CoinGeckoService.class);

    private final RestTemplate restTemplate;

    @Value("${coingecko.api.url}")
    private String apiUrl;

    public CoinGeckoService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<CryptoCurrencyDTO> getCryptoCurrencies(){
        try {
            String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                    .pathSegment("coins", "markets")
                    .queryParam("vs_currency", "usd")
                    .toUriString();

            CryptoCurrencyDTO[] response = restTemplate.getForObject(url, CryptoCurrencyDTO[].class);

            return Arrays.asList(response != null ? response : new CryptoCurrencyDTO[0]);
        }catch (Exception e){
            logger.error("Error fetching data from CoinGecko API: ", e);
            return Collections.emptyList();
        }
    }

    public GlobalMarketDTO getGlobalMarket(){
        try {
            String url = String.format("%s/global", apiUrl);
            return restTemplate.getForObject(url, GlobalMarketDTO.class);
        }catch (Exception e){
            logger.error("Error fetching data from CoinGecko API: ", e);
            return null;
        }
    }
}
