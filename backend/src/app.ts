import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// All API routes, including customers
app.use('/api', routes);

// Centralized error handler
app.use(errorHandler);

export default app;
