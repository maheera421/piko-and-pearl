import dotenv from 'dotenv';
dotenv.config();

import app from './app'; // <- use the existing app with all routes
import config from './config/config';
import connectDB from './config/db';

import generateProductContentRouter from './routes/generateProductContent';

const start = async () => {
  if (!config.MONGODB_URI) {
    console.error('MONGODB_URI is not set. Check your .env file.');
    process.exit(1);
  }

  try {
    await connectDB();

    // Mount AI route onto the existing app
    app.use('/api/generateProductContent', generateProductContentRouter);

    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down server...');
      server.close();
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
