// ...existing code...
import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
  MONGODB_URI: process.env.MONGODB_URI || '',
};

export default config;
// ...existing code...