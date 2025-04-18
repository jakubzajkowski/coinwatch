import {FC, useEffect, useState} from "react";
import styled from "styled-components";
import LiveAlertCard from "./LiveAlertCard.tsx";
import useWebSocketClient from "../../ws/useWebSocketClient.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {StompSubscription} from "@stomp/stompjs";

interface CryptoAlert {
    cryptoId: string;
    symbol: string;
    changePercent: number;
    oldPrice: number;
    newPrice: number;
}


const Container = styled.div`
    padding: 1rem;
    border: 1px solid rgb(255,255,255,0.4);
    border-radius: 0.5rem;
    overflow-y: scroll;
    height: 500px;
`;
const Title = styled.h2`
    font-size: 1.5rem;
`


const LiveAlerts: FC = () => {
    const [alerts, setAlerts] = useState<CryptoAlert[]>([]);
    const { subscribe, unsubscribe, connected } = useWebSocketClient(import.meta.env.VITE_WS_API_URL);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        let subscription: StompSubscription | null = null;

        if (connected) {
            subscription = subscribe(`/user/${user?.id}/topic/crypto-alerts`, (message: string) => {
                const parsedMessage: CryptoAlert = JSON.parse(message);
                setAlerts(state=> [parsedMessage,...state])
            }) as StompSubscription;
        }

        return () => {
            if (subscription) {
                unsubscribe(subscription);
            }
        };
    }, [connected, subscribe, unsubscribe]);


    return (
        <Container>
            <Title>Live Alerts</Title>
            <p style={{color:"#b4b4b4"}}>Real-time notifications about significant price movements</p>
            {alerts.map((alert,index) => (
                <LiveAlertCard key={alert.cryptoId+index}
                               id={alert.cryptoId}
                               name={alert.cryptoId}
                               symbol={alert.symbol}
                               price={alert.newPrice}
                               priceChangePercentage={alert.changePercent}
                               lastUpdated={"5s ago"} />
            ))}
        </Container>
    );
};

export default LiveAlerts;