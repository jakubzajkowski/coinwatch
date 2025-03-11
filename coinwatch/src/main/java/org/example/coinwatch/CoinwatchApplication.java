package org.example.coinwatch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CoinwatchApplication implements CommandLineRunner {
	@Autowired
	private KafkaProducer kafkaProducer;

	@Autowired
	private CoinGeckoService coinGeckoService;

	public static void main(String[] args) {
		SpringApplication.run(CoinwatchApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		System.out.println(this.coinGeckoService.getCryptoPrices());
		kafkaProducer.sendMessage("Hello from Spring Boot Kafka!");
	}
}
