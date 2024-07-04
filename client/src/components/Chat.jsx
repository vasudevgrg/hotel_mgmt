import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5002'); 

const Chat = ({ hotelId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const room = `hotel_${hotelId}`;

    useEffect(() => {
        socket.emit('joinRoom', room);

        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [room]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const msg = {
                room,
                text: message,
                sender: 'user', 
                timestamp: new Date(),
            };
            socket.emit('sendMessage', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        <span>{msg.text}</span>
                        <span className="chat-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;

