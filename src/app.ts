import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import routers from './app/routes';

const app: Application = express();

// Cors
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

export default app;
