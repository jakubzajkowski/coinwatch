package org.example.coinwatch.service;


import org.example.coinwatch.entity.Alert;
import org.example.coinwatch.entity.CryptoCurrency;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.respository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AlertService {
    @Autowired
    private AlertRepository alertRepository;

    public Alert createAlert(User user, CryptoCurrency cryptoCurrency, String symbol, BigDecimal changePercent, BigDecimal oldPrice, BigDecimal newPrice) {
        Alert alert = new Alert(user, cryptoCurrency, symbol, changePercent, oldPrice, newPrice);
        return alertRepository.save(alert);
    }
}
