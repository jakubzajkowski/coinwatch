import {io} from "socket.io-client";
import {useEffect} from "react";


const Notifcations = () =>{
    const socket = io('http://localhost:8080');

    useEffect(() => {
        socket.on('welcome', (data) => {
            console.log('Welcome message:', data);
        });

        socket.on('broadcast', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('welcome');
            socket.off('broadcast');
        };
    }, []);
}

export default Notifcations;