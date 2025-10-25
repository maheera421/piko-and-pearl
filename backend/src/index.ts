import dotenv from 'dotenv';
dotenv.config();

// import mongoose from 'mongoose';
import app from './app'; // adjust if your Express app entry is different
import config from './config/config';
import connectDB from './config/db';

const start = async () => {
  if (!config.MONGODB_URI) {
    console.error('MONGODB_URI is not set. Check your .env file.');
    process.exit(1);
  }

  try {
    // Removed deprecated/unsupported options to satisfy current Mongoose types
    // await mongoose.connect(config.MONGODB_URI);

    await connectDB();

    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    // handle shutdown
    const shutdown = async () => {
      console.log('Shutting down server...');
      server.close();
      // await mongoose.disconnect();
      process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();