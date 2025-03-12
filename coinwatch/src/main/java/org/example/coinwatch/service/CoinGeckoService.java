package org.example.coinwatch.service;

import org.example.coinwatch.CoinGeckoScheduler;
import org.example.coinwatch.dto.CryptoCurrencyDTO;
import org.example.coinwatch.dto.CryptoPriceDTO;
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

    private final String coinIds = "bicoin,ethereum,tether,solana,cardano,doge,avalanche";

    public CoinGeckoService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, CryptoPriceDTO> getCryptoPrices(){
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .pathSegment("simple", "price")
                .queryParam("ids", coinIds)
                .queryParam("vs_currencies", "usd")
                .toUriString();

        ResponseEntity<Map<String, CryptoPriceDTO>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, CryptoPriceDTO>>() {}
        );

        return response.getBody();
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
}
