const mongoose = require('mongoose');
require('dotenv').config();

// Function to establish a database connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MONGO Database');
  } catch (err) {
    console.error('Error connecting to MONGO database:', err);
  }
}

// Call the connectDB function to establish a connection to the database
connectDB();

module.exports = connectDB;
