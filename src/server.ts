import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';
// import { logger, errorLogger } from './shared/logger';
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
  console.log(error);
  process.exit(1);
});

const startServer = async () => {
  try {
    await mongoose.connect(config.database_uri as string);
    console.log('Database is Connected');

    server = app.listen(config.port, () => {
      console.log(`Server is listening on ${config.port} port.`);
    });
  } catch (error) {
    console.log('Error', error);
  }
  // Unhandled Rejection Handler
  // Async Error
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
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
  console.log('Sigterm is received');
  if (server) {
    server.close();
  }
});
