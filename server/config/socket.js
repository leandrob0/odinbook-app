const app = require('../app');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: '*' });

// Socket.io
io.on('connection', (socket) => {
  io.to(socket.flags.id).emit();

  socket.on('disconnect', () => {
    console.log('Someone has left');
  });
});
