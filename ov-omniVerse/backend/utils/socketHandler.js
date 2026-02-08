module.exports = (io) => {
  const users = {};

  io.on('connection', (socket) => {
    console.log('New client connected');

    // User joins with their user ID
    socket.on('user_connected', (userId) => {
      users[userId] = socket.id;
      io.emit('update_user_status', { userId, isOnline: true });
    });

    // Join chat room
    socket.on('join_chat', (chatId) => {
      socket.join(chatId);
    });

    // Send message
    socket.on('send_message', async (data) => {
      const { chatId, message } = data;
      io.to(chatId).emit('receive_message', message);
    });

    // Typing indicator
    socket.on('typing', (data) => {
      socket.to(data.chatId).emit('user_typing', {
        userId: data.userId,
        isTyping: data.isTyping
      });
    });

    // User disconnect
    socket.on('disconnect', () => {
      const userId = Object.keys(users).find(key => users[key] === socket.id);
      if (userId) {
        delete users[userId];
        io.emit('update_user_status', { userId, isOnline: false });
      }
      console.log('Client disconnected');
    });
  });

  return io;
};