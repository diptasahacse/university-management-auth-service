import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';
import { logger, errorLogger } from './shared/logger';
let server: Server;

// Uncaught Exception Handler
/*
Synchronous Error
This handler handler error which made by developer mistake.

For Example,
let x = 5;
console.log(y)

*/
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

const startServer = async () => {
  try {
    await mongoose.connect(config.database_uri as string);
    logger.info('Database is Connected');

    server = app.listen(config.port, () => {
      logger.info(`Server is listening on ${config.port} port.`);
    });
  } catch (error) {
    errorLogger.error('Error', error);
  }
  // Unhandled Rejection Handler
  // Async Error
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
startServer();

// Signal Termination
/*
I can terminate the server by sending signal
*/
process.on('SIGTERM', () => {
  logger.info('Sigterm is received');
  if (server) {
    server.close();
  }
});
