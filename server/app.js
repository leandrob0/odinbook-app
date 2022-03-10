require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const connectDb = require('./config/db');

connectDb();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes setup
const userRouter = require('./routes/userRouter');
const postsRouter = require('./routes/postRouter');
app.use('/api/users', userRouter);
app.use('/api/posts', postsRouter);

// Errors handlers
const errors = require('./middleware/errorHandler');
app.use(errors.errorHandler);
app.use(errors.unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});
