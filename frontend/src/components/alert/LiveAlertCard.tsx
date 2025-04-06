import styled from "styled-components";
import {FC} from "react";

const CardContainer = styled.div`
    border-radius: 12px;
    padding: 16px;
    border: 1px solid rgb(255,255,255,0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    background-color: #151518;
`;

const Header = styled.div`
  margin-bottom: 12px;
`;

const CoinName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const PriceChange = styled.p`
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: #b4b4b4;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const TimeAgo = styled.div`
    font-size: 0.9rem;
    color: #b4b4b4;
    text-align: right;
`;

interface LiveAlertCardProps {
    id: string;
    name: string;
    symbol: string;
    price: number;
    priceChangePercentage: number;
    lastUpdated: string;
}

const LiveAlertCard : FC<LiveAlertCardProps> = ({lastUpdated,name,symbol,priceChangePercentage,price}) => {
    const isPositive = priceChangePercentage >= 0;
    return (
        <CardContainer>
            <Header>
                <CoinName>{name} ({symbol.toUpperCase()})</CoinName>
                <PriceChange>Price {isPositive ? 'increased' : 'decreased'} by {Math.abs(priceChangePercentage)}%</PriceChange>
            </Header>
            <div>
                <Price>${price.toFixed(2)}</Price>
                <TimeAgo>{lastUpdated}</TimeAgo>
            </div>
        </CardContainer>
    );
};

export default LiveAlertCard;