package org.example.coinwatch.kafka.comsumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class AiAnalyseConsumer {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "ai-response-topic", groupId = "spring-test-group", containerFactory = "kafkaListenerContainerFactory")
    public void consumeAiAnalyse(String message) {
        messagingTemplate.convertAndSend("/analyse/test", message);
    }
}
