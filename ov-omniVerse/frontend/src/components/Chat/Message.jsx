export default function MessageItem({ msg, onDelete, onReply }) {
    return (
        <motion.div whileHover={{ scale: 1.01 }} className="message-item">
            <div className="msg-content">
                {msg.replyTo && <div className="reply-preview">Membalas: {msg.replyTo.text}</div>}
                <p>{msg.text}</p>
                {msg.image && <img src={msg.image} style={{ maxWidth: '200px', borderRadius: '8px' }} />}
            </div>
            
            <div className="msg-actions">
                <button onClick={() => onReply(msg)}>Reply</button>
                <button onClick={() => onDelete(msg._id)} style={{color: 'red'}}>Hapus</button>
            </div>
        </motion.div>
    );
}
