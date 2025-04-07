import {FC, useState} from "react";
import HistoryAlertCard, {Alert} from "./HistoryAlertCard.tsx";
import styled from "styled-components";


const alerts: Alert[] = [
    { name: "Bitcoin (BTC)", type: "increase", change: "23.5%", price: "$51,342.67", date: "Apr 7, 09:24 PM" },
    { name: "Ethereum (ETH)", type: "volume", change: "45.2%", price: "$2,786.43", date: "Apr 7, 06:24 PM" },
    { name: "Cardano (ADA)", type: "decrease", change: "18.7%", price: "$0.58", date: "Apr 7, 11:24 AM" },
    { name: "Solana (SOL)", type: "increase", change: "32.1%", price: "$102.78", date: "Apr 6, 11:24 PM" },
    { name: "XRP (XRP)", type: "decrease", change: "15.3%", price: "$0.52", date: "Apr 5, 11:24 PM" },
    { name: "Polkadot (DOT)", type: "volume", change: "28.9%", price: "$7.23", date: "Apr 4, 11:24 PM" },
    { name: "Dogecoin (DOGE)", type: "increase", change: "20.3%", price: "$0.12", date: "Apr 2, 10:00 PM" },
];

const Container = styled.div`
    padding: 1rem;
    border: 1px solid rgb(255,255,255,0.4);
    border-radius: 0.5rem;
    overflow-y: scroll;
    height: 700px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SubTitle = styled.p`
  color: #999;
  margin-bottom: 1.5rem;
`;

const TabList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? '#333' : '#1f1f1f')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

const CryptoAlertsComponent: FC = () => {
    const [filter, setFilter] = useState<"all" | Alert["type"]>("all");

    const filteredAlerts = alerts.filter(
        (a) => filter === "all" || a.type === filter
    );

    return (
        <Container>
            <Title>Alert History</Title>
            <SubTitle>Your recent price movement notifications</SubTitle>

            <TabList>
                <TabButton active={filter === "all"} onClick={() => setFilter("all")}>All</TabButton>
                <TabButton active={filter === "increase"} onClick={() => setFilter("increase")}>Price Increase</TabButton>
                <TabButton active={filter === "decrease"} onClick={() => setFilter("decrease")}>Price Decrease</TabButton>
                <TabButton active={filter === "volume"} onClick={() => setFilter("volume")}>Volume Spike</TabButton>
            </TabList>

            {filteredAlerts.map((alert, i) => (
                <HistoryAlertCard key={i} alert={alert} />
            ))}
        </Container>
    );
};

export default CryptoAlertsComponent;