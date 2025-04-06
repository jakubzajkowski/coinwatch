package org.example.coinwatch.controller;


import org.example.coinwatch.entity.Alert;
import org.example.coinwatch.service.AlertService;
import org.example.coinwatch.service.CryptoAlertsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class AlertResolver {
    @Autowired
    AlertService alertService;

    @QueryMapping
    public List<Alert> getAlerts(){
        return alertService.getAlerts();
    }

    @QueryMapping
    public List<Alert> getAlertByUserId(@Argument Long userId){
        return alertService.getAlertByUserId(userId);
    }
}
