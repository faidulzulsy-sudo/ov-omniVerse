import React from 'react';
import { motion } from 'framer-motion';

const MessageItem = ({ msg, onDelete, onReply, currentUser }) => {
    const isOwnMessage = msg.senderId === currentUser?.id;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
                marginBottom: '15px',
                padding: '0 20px'
            }}
        >
            {/* Indikator Reply */}
            {msg.replyTo && (
                <div style={replyPreviewStyle}>
                    <small>Replying to: {msg.replyTo.text.substring(0, 20)}...</small>
                </div>
            )}

            <div style={{
                backgroundColor: isOwnMessage ? '#5865F2' : '#2F3136', // Warna ala Discord
                padding: '10px 15px',
                borderRadius: '12px',
                maxWidth: '70%',
                position: 'relative'
            }}>
                {/* Menampilkan Gambar jika ada */}
                {msg.imageUrl && (
                    <img 
                        src={msg.imageUrl} 
                        alt="attachment" 
                        style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' }} 
                    />
                )}

                <p style={{ margin: 0 }}>{msg.text}</p>

                {/* Tombol Aksi (Hanya muncul saat hover) */}
                <div className="msg-actions" style={actionContainerStyle}>
                    <button onClick={() => onReply(msg)} title="Reply">↩️</button>
                    {isOwnMessage && (
                        <button onClick={() => onDelete(msg._id)} title="Hapus" style={{ color: '#ff4757' }}>🗑️</button>
                    )}
                </div>
            </div>
            <small style={{ fontSize: '10px', color: '#bbb', marginTop: '4px' }}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </small>
        </motion.div>
    );
};

const replyPreviewStyle = {
    background: 'rgba(255,255,255,0.1)',
    padding: '4px 10px',
    borderRadius: '8px 8px 0 0',
    fontSize: '11px',
    color: '#ccc',
    borderLeft: '3px solid #5865F2',
    marginBottom: '-2px'
};

const actionContainerStyle = {
    display: 'flex',
    gap: '8px',
    marginTop: '5px',
    background: 'rgba(0,0,0,0.3)',
    padding: '4px',
    borderRadius: '5px'
};

export default MessageItem;
