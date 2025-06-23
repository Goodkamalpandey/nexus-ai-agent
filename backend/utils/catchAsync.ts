import { Request, Response, NextFunction } from 'express';

// A function that takes an async Express route handler and wraps it to catch errors
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const catchAsync = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};