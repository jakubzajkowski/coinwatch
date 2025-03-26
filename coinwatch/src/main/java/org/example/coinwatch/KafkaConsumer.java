package org.example.coinwatch;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    private final SimpMessagingTemplate messagingTemplate;

    public KafkaConsumer(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @KafkaListener(topics = "crypto-alerts", groupId = "crypto-alert-group")
    public void consumeAlert(ConsumerRecord<String, String> record) {
        String symbol = record.key();
        String message = record.value();

        System.out.println("📩 Odebrano alert z Kafki: " + message);

    }
}
