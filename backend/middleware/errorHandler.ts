import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import { log } from '../utils/resilienceLogger';

const sendErrorDev = (err: AppError, res: Response) => {
  log({
    level: 'error',
    message: `DEV_ERROR: ${err.message}`,
    error: { name: err.name, message: err.message, stack: err.stack },
  });

  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  log({
    level: 'error',
    message: `PROD_ERROR: ${err.message}`,
    error: { name: err.name, message: err.message, stack: err.stack },
  });

  // 2) Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  const error = err instanceof AppError ? err : new AppError(err.message, 500);

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};