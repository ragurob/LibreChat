require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  try {
    if (isConnected) {
      console.green('MongoDB connection already established');
      return;
    }

    // Replit-optimized connection settings
    mongoose.set('strictQuery', true);

    // Set connection options optimized for cloud environments
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increased timeout for Replit
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Limit connection pool for Replit
      retryWrites: true,
      w: 'majority',
      ...(options || {})
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, connectionOptions);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    return conn;

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  connectDb,
};