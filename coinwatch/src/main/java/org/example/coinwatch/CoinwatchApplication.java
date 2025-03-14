package org.example.coinwatch;

import org.example.coinwatch.service.CoinGeckoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
@EnableAsync
public class CoinwatchApplication{
	@Autowired
	private KafkaProducer kafkaProducer;

	@Autowired
	private CoinGeckoService coinGeckoService;

	public static void main(String[] args) {
		SpringApplication.run(CoinwatchApplication.class, args);
	}

}
