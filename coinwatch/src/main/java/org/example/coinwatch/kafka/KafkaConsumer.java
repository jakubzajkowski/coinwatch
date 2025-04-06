package org.example.coinwatch.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.coinwatch.dto.PriceChangeAlert;
import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.Subscription;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.respository.CryptoCurrencyRepository;
import org.example.coinwatch.respository.UserRepository;
import org.example.coinwatch.service.AlertService;
import org.example.coinwatch.service.CryptoCurrencyService;
import org.example.coinwatch.service.SubscriptionService;
import org.example.coinwatch.service.UserService;
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
    private AlertService alertService;

    @Autowired
    private CryptoCurrencyService cryptoCurrencyService;

    @Autowired
    private UserService userService;

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

        for (Long userId : users) {
            User user = userService.getUserById(userId);

            CryptoCurrency cryptoCurrency = cryptoCurrencyService.getCryptoCurrencyById(priceChangeAlert.getCryptoId());


            alertService.createAlert(user, cryptoCurrency, priceChangeAlert.getSymbol(),
                    priceChangeAlert.getChangePercent(),
                    priceChangeAlert.getOldPrice(),
                    priceChangeAlert.getNewPrice());

            String destination = "/user/" + userId + "/topic/crypto-alerts";
            messagingTemplate.convertAndSend(destination, priceChangeAlert);
        }
    }
}
