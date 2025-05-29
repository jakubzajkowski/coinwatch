import React from 'react';
import styled from 'styled-components';

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

const CoinIcon = styled.div`
    width: 24px;
    height: 24px;
    background-color: #666;
    border-radius: 50%;
`;

const CoinName = styled.span`
    font-weight: 500;
`;

const Percentage = styled.span<{ isPositive: boolean }>`
    color: ${({ isPositive }) => isPositive ? '#26A69A' : '#EF5350'};
    font-weight: 500;
`;

const mockTrendingCoins = [
    { name: 'Bitcoin', symbol: 'BTC', percentage: 2.45 },
    { name: 'Ethereum', symbol: 'ETH', percentage: -1.23 },
    { name: 'Cardano', symbol: 'ADA', percentage: 5.67 },
    { name: 'Solana', symbol: 'SOL', percentage: -0.89 },
    { name: 'Polkadot', symbol: 'DOT', percentage: 3.21 }
];

const TrendingCoins: React.FC = () => {
    return (
        <TrendingContainer>
            <Title>Trending Coins</Title>
            <CoinList>
                {mockTrendingCoins.map((coin, index) => (
                    <CoinItem key={index}>
                        <CoinInfo>
                            <CoinIcon />
                            <CoinName>{coin.name}</CoinName>
                            <span>({coin.symbol})</span>
                        </CoinInfo>
                        <Percentage isPositive={coin.percentage > 0}>
                            {coin.percentage > 0 ? '+' : ''}{coin.percentage}%
                        </Percentage>
                    </CoinItem>
                ))}
            </CoinList>
        </TrendingContainer>
    );
};

export default TrendingCoins;
