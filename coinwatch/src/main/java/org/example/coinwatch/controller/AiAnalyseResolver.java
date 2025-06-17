package org.example.coinwatch.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.coinwatch.kafka.producer.AiAnalyseProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class AiAnalyseResolver {
    @Autowired
    AiAnalyseProducer aiAnalyseProducer;

    @MutationMapping
    public String startAiAnalyse(@Argument String cryptoId, @Argument Long userId) throws JsonProcessingException {
        aiAnalyseProducer.sendCryptoPriceDataToAnalyse(cryptoId,userId);
        return "Pending";
    }
}
