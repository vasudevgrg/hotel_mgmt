
const socketIo = require('socket.io');

const setupChatSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`Client joined room: ${room}`);
        });

        socket.on('sendMessage', (message) => {
            io.to(message.room).emit('receiveMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};

module.exports = setupChatSocket;

