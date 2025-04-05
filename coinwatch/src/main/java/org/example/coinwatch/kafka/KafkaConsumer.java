package org.example.coinwatch.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.coinwatch.dto.PriceChangeAlert;
import org.example.coinwatch.entity.Subscription;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.respository.UserRepository;
import org.example.coinwatch.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class KafkaConsumer {

    @Autowired
    private ObjectMapper objectMapper;

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    private SubscriptionService subscriptionService;

    public KafkaConsumer(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Transactional
    @KafkaListener(topics = "crypto-alerts", groupId = "crypto-alert-group", containerFactory = "kafkaListenerContainerFactory")
    public void consumeAlert(String alert) throws JsonProcessingException {
        PriceChangeAlert priceChangeAlert = objectMapper.readValue(alert,PriceChangeAlert.class);

        List<Long> users = subscriptionService.getUserIdsSubscribedTo(priceChangeAlert.getSymbol());

        for (Object userIdObj : users) {
            Long userId = null;

            if (userIdObj instanceof Integer intId) {
                userId = intId.longValue();
            } else if (userIdObj instanceof Long longId) {
                userId = longId;
            } else {
                throw new IllegalArgumentException("Unsupported user ID type: " + userIdObj.getClass());
            }

            String destination = "/user/" + userId + "/topic/crypto-alerts";
            messagingTemplate.convertAndSend(destination, priceChangeAlert);
        }
    }
}
