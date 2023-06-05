import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { Server } from 'http'
import { logger, errorLogger } from './shared/logger'
const startServer = async () => {
  let server: Server
  try {
    await mongoose.connect(config.database_uri as string)
    logger.info('Database is Connected')

    server = app.listen(config.port, () => {
      logger.info(`Server is listening on ${config.port} port.`)
    })
  } catch (error) {
    errorLogger.error('Error', error)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection detected, We are closing the connection')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
startServer()
