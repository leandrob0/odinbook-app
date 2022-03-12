const mongoose = require('mongoose');

const MONGO = process.env.PROD_URI;

const connectDb = async () => {
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
