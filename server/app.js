require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: '*' });
const connectDb = require('./config/db');

connectDb();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Sets up path to upload images.
app.use('/public', express.static(path.join(__dirname, 'public')));

// Initializes passport.
const passport = require('./config/passport');
app.use(passport.initialize());

// Routes setup
const userRouter = require('./routes/userRouter');
const postsRouter = require('./routes/postRouter');
app.use('/api/users', userRouter);
app.use('/api/posts', postsRouter);

// Errors handlers
const errors = require('./middleware/errorHandler');
app.use(errors.errorHandler);
app.use(errors.unknownEndpoint);

// Socket.io
io.on('connection', (socket) => {
  console.log('Someone has connected.');

  socket.on('disconnect', () => {
    console.log('Someone has left');
  })
})

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});

module.exports = app;
