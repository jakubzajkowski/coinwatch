package org.example.coinwatch.service;

import org.example.coinwatch.dto.GlobalMarketDTO;
import org.example.coinwatch.entity.GlobalMarket;
import org.example.coinwatch.graphql.CurrencyProcentage;
import org.example.coinwatch.graphql.CurrencyValue;
import org.example.coinwatch.graphql.GlobalMarketGraphqlDTO;
import org.example.coinwatch.respository.GlobalMarketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GlobalMarketService {

    @Autowired
    private GlobalMarketRepository globalMarketRepository;

    public void saveGlobalMarketData(GlobalMarketDTO globalMarketDTO) {
        GlobalMarket globalMarket = new GlobalMarket();

        GlobalMarketDTO.Data data = globalMarketDTO.getData();

        globalMarket.setActiveCryptocurrencies(data.getActiveCryptocurrencies());
        globalMarket.setUpcomingIcos(data.getUpcomingIcos());
        globalMarket.setOngoingIcos(data.getOngoingIcos());
        globalMarket.setEndedIcos(data.getEndedIcos());
        globalMarket.setMarkets(data.getMarkets());
        globalMarket.setTotalMarketCap(data.getTotalMarketCap());
        globalMarket.setTotalVolume(data.getTotalVolume());
        globalMarket.setMarketCapPercentage(data.getMarketCapPercentage());
        globalMarket.setMarketCapChangePercentage24hUsd(data.getMarketCapChangePercentage24hUsd());
        globalMarket.setUpdatedAt(data.getUpdatedAt());

        globalMarketRepository.save(globalMarket);
    }

    @Transactional
    public GlobalMarketGraphqlDTO getGlobalMarket() {
        GlobalMarket gm = globalMarketRepository.findAll().getLast();

        GlobalMarketGraphqlDTO dto = new GlobalMarketGraphqlDTO();
        dto.setId(gm.getId());
        dto.setActiveCryptocurrencies(gm.getActiveCryptocurrencies());
        dto.setUpcomingIcos(gm.getUpcomingIcos());
        dto.setOngoingIcos(gm.getOngoingIcos());
        dto.setEndedIcos(gm.getEndedIcos());
        dto.setMarkets(gm.getMarkets());
        dto.setMarketCapChangePercentage24hUsd(gm.getMarketCapChangePercentage24hUsd());
        dto.setUpdatedAt(gm.getUpdatedAt());

        dto.setTotalMarketCap(gm.getTotalMarketCap().entrySet().stream()
                .map(e -> new CurrencyValue(e.getKey(), e.getValue()))
                .toList());

        dto.setTotalVolume(gm.getTotalVolume().entrySet().stream()
                .map(e -> new CurrencyValue(e.getKey(), e.getValue()))
                .toList());

        dto.setMarketCapPercentage(
                gm.getMarketCapPercentage().entrySet().stream()
                        .filter(e -> e.getValue() != null)
                        .map(e -> new CurrencyProcentage(e.getKey(), e.getValue()))
                        .toList()
        );

        return dto;
    }

}
