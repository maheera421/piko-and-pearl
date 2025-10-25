import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
}

export default errorHandler;