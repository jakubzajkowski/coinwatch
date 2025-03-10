package org.example.coinwatch;

import org.example.coinwatch.dto.CryptoPriceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class CoinGeckoService {
    private final RestTemplate restTemplate;

    @Value("${coingecko.api.url}")
    private String apiUrl;

    public CoinGeckoService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, CryptoPriceDTO> getCryptoPrices(String coinIds){
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .pathSegment("simple", "price")
                .queryParam("ids", coinIds)
                .queryParam("vs_currencies", "usd")
                .toUriString();

        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        return response.getBody();
    }
}
