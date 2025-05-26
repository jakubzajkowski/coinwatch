package org.example.coinwatch.kafka.producer;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.coinwatch.dto.AggregatedPricesForAnalyseDTO;
import org.example.coinwatch.dto.AiAnalyseMessageDTO;
import org.example.coinwatch.respository.CryptoPriceHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AiAnalyseProducer {
    @Autowired
    KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    CryptoPriceHistoryRepository cryptoPriceHistoryRepository;

    @Autowired
    ObjectMapper objectMapper;

    public void sendCryptoPriceDataToAnalyse(String cryptoId) throws JsonProcessingException {
        List<AggregatedPricesForAnalyseDTO> aggregatedPricesForAnalyseDTO = cryptoPriceHistoryRepository.findByCryptoIdAggregatedPricesForAnalyse("bitcoin");

        List<AiAnalyseMessageDTO.PricePoint> pricePoints = aggregatedPricesForAnalyseDTO.stream().map(
                prices -> new AiAnalyseMessageDTO.PricePoint(prices.getAvgPrice(),prices.getBucket())
        ).toList();

        AiAnalyseMessageDTO aiAnalyseMessageDTO = new AiAnalyseMessageDTO(cryptoId,pricePoints);
        var json = objectMapper.writeValueAsString(aiAnalyseMessageDTO);
        kafkaTemplate.send("ai-test-topic", cryptoId, json);
    }
}
