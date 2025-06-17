package org.example.coinwatch.kafka.comsumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.coinwatch.dto.AiAnalyseResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class AiAnalyseConsumer {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "ai-response-topic", groupId = "spring-test-group", containerFactory = "kafkaListenerContainerFactory")
    public void consumeAiAnalyse(String message) throws JsonProcessingException {
        AiAnalyseResponseDTO aiAnalyseResponseDTO = objectMapper.readValue(message, AiAnalyseResponseDTO.class);
        messagingTemplate.convertAndSend("/analyse/"+aiAnalyseResponseDTO.getUserId(), aiAnalyseResponseDTO.getText());
    }
}
