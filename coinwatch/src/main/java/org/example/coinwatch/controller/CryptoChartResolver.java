package org.example.coinwatch.controller;

import org.example.coinwatch.dto.ChartType;
import org.example.coinwatch.service.CryptoChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.time.ZonedDateTime;
import java.util.List;

@Controller
public class CryptoChartResolver {
    @Autowired
    private CryptoChartService cryptoChartService;

    @QueryMapping
    public List<?> getCryptoChartData(@Argument String cryptoId,
                                      @Argument String interval,
                                      @Argument ZonedDateTime from,
                                      @Argument ZonedDateTime to,
                                      @Argument ChartType chartType)
    {
        return cryptoChartService.getChartData(cryptoId,interval,from,to,chartType);
    }
}
