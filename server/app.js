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
const connectDb = require('./config/db');

connectDb();

app.use(
  cors({
    origin: 'https://odinbook-top.herokuapp.com/',
  })
);
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

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    'script-src \'self\' https://connect.facebook.net/en_US/sdk.js'
  );
  return next();
});

// Routes setup
const userRouter = require('./routes/userRouter');
const postsRouter = require('./routes/postRouter');
const commentsRouter = require('./routes/commentRouter');
app.use('/api/users', userRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

// Deployment
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/build/index.html'));
});

// Errors handlers
const errors = require('./middleware/errorHandler');
app.use(errors.errorHandler);
app.use(errors.unknownEndpoint);

const PORT = process.env.PORT || 4005;
server.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});

module.exports = app;
