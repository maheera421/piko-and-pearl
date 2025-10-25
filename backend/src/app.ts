import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import errorHandler from './middlewares/errorHandler'; // default import

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api', routes);

// centralized error handler (must be after routes)
app.use(errorHandler);

export default app;