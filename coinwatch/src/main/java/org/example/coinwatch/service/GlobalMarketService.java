package org.example.coinwatch.service;

import org.example.coinwatch.dto.GlobalMarketDTO;
import org.example.coinwatch.entity.GlobalMarket;
import org.example.coinwatch.respository.GlobalMarketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
