import {useEffect, useState} from "react";
import useWebSocketClient from "../ws/useWebSocketClient.ts";
import {StompSubscription} from "@stomp/stompjs";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";



const Notifications = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const { subscribe, unsubscribe, sendMessage, connected } = useWebSocketClient(import.meta.env.VITE_WS_API_URL);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        let subscription: StompSubscription | null = null;
        console.log("connected xd");
        if (connected) {
            console.log("connected xd");
            subscription = subscribe(`/analyse/test`, (message: string) => {
                console.log("message", message);
                setMessages(prevMessages => [...prevMessages, message]);
            }) as StompSubscription;
        }

        return () => {
            if (subscription) {
                unsubscribe(subscription);
            }
        };
    }, [connected, subscribe, unsubscribe]);

    const sendNotification = () => {
        if (connected) {
            sendMessage('/app/notify', 'New notification from client!');
        }
    };

    return (
        <div style={{ margin: "5rem 0" }}>
            <h1>WebSocket Notifications</h1>
            <button onClick={sendNotification} disabled={!connected}>
                Send Notification
            </button>
            <div>
                <h2>Messages:</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notifications;