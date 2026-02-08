import React, { useState } from 'react';
import MessageItem from './MessageItem';

export default function ChatWindow({ messages, onSendMessage, onDeleteMessage }) {
    const [replyingTo, setReplyingTo] = useState(null);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Daftar Pesan */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
                {messages.map((msg) => (
                    <MessageItem 
                        key={msg._id} 
                        msg={msg} 
                        onDelete={onDeleteMessage}
                        onReply={(m) => setReplyingTo(m)}
                        currentUser={{ id: '123' }} // Nanti ganti dengan data user login asli
                    />
                ))}
            </div>

            {/* Input Pesan */}
            <div style={{ padding: '20px', background: '#2F3136' }}>
                {replyingTo && (
                    <div style={{ color: '#5865F2', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Replying to {replyingTo.text}</span>
                        <button onClick={() => setReplyingTo(null)}>❌</button>
                    </div>
                )}
                <input 
                    type="text" 
                    placeholder="Ketik pesan..." 
                    style={inputStyle} 
                    onKeyPress={(e) => e.key === 'Enter' && onSendMessage(e.target.value, replyingTo)}
                />
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#40444B',
    color: 'white'
};
