const mongoose = require('mongoose');

const connectDb = async () => {
  const MONGO =
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_URI
      : process.env.PROD_URI;
  try {
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the db');
  } catch (err) {
    console.log('Error on mongo connection');
  }
};

module.exports = connectDb;
