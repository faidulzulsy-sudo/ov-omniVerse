import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://cooing-mireille-omniverse-502f0d60.koyeb.app');

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, []);

    const sendMessage = () => {
        socket.emit('sendMessage', { text: message });
        setMessage('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Global Chat</h2>
            <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
                {messages.map((msg, i) => <p key={i}>{msg.text}</p>)}
            </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ketik pesan..." />
            <button onClick={sendMessage}>Kirim</button>
        </div>
    );
}
