const app = require('../app');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: '*' });

let allUsers = [];

const addNewUser = (user, socketId) => {
  !allUsers.some((x) => x.email === user.email) &&
    allUsers.push({ user, socketId });
};

const getUser = (email) => {
  return allUsers.find((user) => user.email === email);
};

// Socket.io
io.on('connection', (socket) => {
  socket.on('newUser', (user) => {
    addNewUser(user, socket.id);
  });

  socket.on('sendFriendRequest', ({ senderUser, receiverUser }) => {
    const receiver = getUser(receiverUser.email);
    socket.to(receiver.socketId).emit('receiveFriendRequest', { senderUser });
  });
});
