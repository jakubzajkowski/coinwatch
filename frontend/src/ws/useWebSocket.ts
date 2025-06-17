import { StompSubscription } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import useWebSocketClient from "./useWebSocketClient";


const useWebSocket = (url: string) => {
    const [messages, setMessages] = useState<string[]>([]);
    const { subscribe, unsubscribe, connected, sendMessage } = useWebSocketClient(import.meta.env.VITE_WS_API_URL); 

    useEffect(() => {
        let subscription: StompSubscription | null = null;
        if (connected) {
            subscription = subscribe(url, (message: string) => {
                setMessages(prevMessages => [...prevMessages, message]);
            }) as StompSubscription;
        }

        return () => {
            if (subscription) { 
                unsubscribe(subscription);
            }
        };
    }, [connected, subscribe, unsubscribe]);

    return { messages, connected, sendMessage };
}

export default useWebSocket;