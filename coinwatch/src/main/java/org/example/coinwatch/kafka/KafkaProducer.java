package org.example.coinwatch.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.coinwatch.dto.PriceChangeAlert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class KafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendPriceChangeAlert(String symbol, BigDecimal changePercent, BigDecimal oldPrice, BigDecimal newPrice) throws JsonProcessingException {
        PriceChangeAlert alert = new PriceChangeAlert(symbol, changePercent, oldPrice, newPrice);
        var json = objectMapper.writeValueAsString(alert);
        kafkaTemplate.send("crypto-alerts", symbol, json);
    }
}
