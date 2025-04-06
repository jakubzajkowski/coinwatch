import { useState, useEffect, useCallback } from "react";
import SockJS from 'sockjs-client';
import { Client, StompSubscription } from '@stomp/stompjs';

interface UseWebSocketClientResult {
    subscribe: (channel: string, callback: (message: string) => void) => StompSubscription | void;
    unsubscribe: (subscription: StompSubscription) => void;
    sendMessage: (destination: string, message: string) => void;
    connected: boolean;
}

const useWebSocketClient = (url: string): UseWebSocketClientResult => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        const socket = new SockJS(url);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connected to WebSocket");
                setConnected(true);
            },
            onDisconnect: () => {
                console.log("Disconnected from WebSocket");
                setConnected(false);
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame.headers.message);
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [url]);

    const subscribe = useCallback((channel: string, callback: (message: string) => void) => {
        if (stompClient && connected) {
            const subscription = stompClient.subscribe(channel, (message) => {
                callback(message.body);
            });
            return subscription;
        }
    }, [stompClient, connected]);

    const unsubscribe = useCallback((subscription: StompSubscription) => {
        if (subscription) {
            subscription.unsubscribe();  // Anulowanie subskrypcji
        }
    }, []);

    const sendMessage = useCallback((destination: string, message: string) => {
        if (stompClient && connected) {
            stompClient.publish({
                destination,
                body: message,
            });
        }
    }, [stompClient, connected]);

    return { subscribe, unsubscribe, sendMessage, connected };
};

export default useWebSocketClient;