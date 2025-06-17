import React from 'react';
import styled from 'styled-components';
import { GET_CURRENCIES_FOR_TRENDING_COINS } from '../../apollo/queries';
import { useQuery } from '@apollo/client';
import QueryBoundary from '../QueryBoundary';

const TrendingContainer = styled.div`
    width: 24%;
    padding: 20px;
    background-color: ${props => props.theme.colors.fourth};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const CoinList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CoinItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
`;

const CoinInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CoinIcon = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
`;

const CoinName = styled.span`
    font-weight: 500;
`;

const Percentage = styled.span<{ isPositive: boolean }>`
    color: ${({ isPositive }) => isPositive ? '#26A69A' : '#EF5350'};
    font-weight: 500;
`;

const TrendingCoins: React.FC = () => {
    const {data,error,loading} = useQuery(GET_CURRENCIES_FOR_TRENDING_COINS,{
        variables: {
            limit: 10,
            orderBy: "priceChangePercentage24h",
            order: "desc"
        }
    });

    return (
        <TrendingContainer>
            <Title>Trending Coins</Title>
            <QueryBoundary error={error} loading={loading}>
                <CoinList>
                    {data && (data.getCryptoCurrencies as Array<{
                        imageUrl: string;
                        name: string;
                        symbol: string;
                        cryptoId: string;
                        priceChangePercentage24h: number;
                    }>).map((coin, index) => (
                        <CoinItem key={index}>
                            <CoinInfo>
                                <CoinIcon src={coin.imageUrl} alt={`${coin.name} icon`} />
                                <CoinName>({coin.symbol})</CoinName>
                                <span>{coin.cryptoId}</span>
                            </CoinInfo>
                            <Percentage isPositive={coin.priceChangePercentage24h > 0}>
                                {coin.priceChangePercentage24h > 0 ? '+' : ''}{coin.priceChangePercentage24h}%
                            </Percentage>
                        </CoinItem>
                    ))}
                </CoinList>
            </QueryBoundary>
        </TrendingContainer>
    );
};

export default TrendingCoins;
