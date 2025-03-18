import {useEffect, useState} from "react";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';


const Notifications = () =>{
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/topic/greetings', (message) => {
                    setMessages((prevMessages) => [...prevMessages, message.body]);
                });
                client.subscribe('/topic/kafka-messages', (message) => {
                    setMessages((prevMessages) => [...prevMessages, message.body]);
                });
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame.headers.message);
            },
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

    const sendMessage = () => {
        if (stompClient && inputValue) {
            stompClient.publish({
                destination: '/app/hello',
                body: inputValue,
            });
            setInputValue('');
        }
    };

    return (
        <div style={{margin:"5rem 0"}}>
            <h1>WebSocket with SockJS and STOMP</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
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
}

export default Notifications;