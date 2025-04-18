import { useQuery } from "@apollo/client";
import { FC } from "react";
import styled from "styled-components";
import { GET_GLOBAL_MARKET } from "../../apollo/queries";
import { GetGlobalMarketQuery } from "../../graphql/generated";
import formatNumber from "../../utils/formatNumber";
import QueryBoundary from "../QueryBoundary";

interface StatChangeProps {
    positive: boolean;
}

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  border: 1px solid rgb(255,255,255,0.4);
  border-radius: 8px;
  padding: 15px;
  flex: 1;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const StatTitle = styled.h3`
  font-size: 14px;
  color: ${({theme})=>theme.colors.third};
  margin: 0 0 10px 0;
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: ${({theme})=>theme.colors.primary};
`;

const StatChange = styled.span<StatChangeProps>`
  color: ${props => props.positive ? '#16c784' : '#ea3943'};
  font-size: 14px;
`;

const Stats : FC = () => {
    const {error,loading,data} = useQuery<GetGlobalMarketQuery>(GET_GLOBAL_MARKET);

    return <QueryBoundary loading={loading} error={error}>
        <StatsContainer>
          <StatCard>
              <StatTitle>Market Cap</StatTitle>
              <StatValue>${formatNumber(data?.getGlobalMarket?.totalMarketCap[0].amount as number)}</StatValue>
              {
                  data?.getGlobalMarket?.marketCapChangePercentage24hUsd as number > 0 ?
                  <StatChange positive>↑ {data?.getGlobalMarket?.marketCapChangePercentage24hUsd.toFixed(2)}% 24h</StatChange> 
                  :
                  <StatChange positive={false}>↓ {data?.getGlobalMarket?.marketCapChangePercentage24hUsd.toFixed(2)}% 24h</StatChange>
              }
          </StatCard>

          <StatCard>
              <StatTitle>Total Volume</StatTitle>
              <StatValue>${formatNumber(data?.getGlobalMarket?.totalVolume[0].amount as number)}</StatValue>
          </StatCard>

          <StatCard>
              <StatTitle>Active Cryptocurrencies</StatTitle>
              <StatValue>${formatNumber(data?.getGlobalMarket?.activeCryptocurrencies as number)}</StatValue>
          </StatCard>


          <StatCard>
              <StatTitle>Total Markets</StatTitle>
              <StatValue>${formatNumber(data?.getGlobalMarket?.markets as number)}</StatValue>
          </StatCard>
        </StatsContainer>
      </QueryBoundary>
}

export default Stats;