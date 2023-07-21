import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import routers from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Cors
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Application routes
app.use('/api/v1', routers);

// // Default Route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('This Testing Error')
//   // throw new ApiError(400, 'This is API Error')
//   // next('This is Next Error')
// })

// Global Error Handler
app.use(globalErrorHandler);

// Handle Not Found Error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
