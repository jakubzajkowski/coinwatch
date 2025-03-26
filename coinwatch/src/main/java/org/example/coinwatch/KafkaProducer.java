package org.example.coinwatch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendAlert(String symbol, String message) {
        kafkaTemplate.send("crypto-alerts", symbol, message);
        System.out.println("🔔 Alert wysłany do Kafki: " + message);
    }
}
