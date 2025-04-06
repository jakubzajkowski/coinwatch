package org.example.coinwatch.service;


import org.example.coinwatch.entity.Alert;
import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.respository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AlertService {
    @Autowired
    private AlertRepository alertRepository;

    public Alert createAlert(User user, CryptoCurrency cryptoCurrency, String symbol, BigDecimal changePercent, BigDecimal oldPrice, BigDecimal newPrice) {
        Alert alert = new Alert(user, cryptoCurrency, symbol, changePercent, oldPrice, newPrice);
        return alertRepository.save(alert);
    }
    @Cacheable(value = "alerts")
    public List<Alert> getAlerts(){
        return alertRepository.findAll();
    }

    @Cacheable(value = "alerts",key = "#userId")
    public List<Alert> getAlertByUserId(Long userId){
        return alertRepository.findAlertsByUserId(userId).orElseThrow(()->new IllegalArgumentException("User hasn't alerts"));
    }
}
