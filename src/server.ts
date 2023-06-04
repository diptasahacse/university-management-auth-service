import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
const startServer = async () => {
  try {
    await mongoose.connect(config.database_uri as string)
    logger.info('Database is Connected')

    app.listen(config.port, () => {
      logger.info(`Server is listening on ${config.port} port.`)
    })
  } catch (error) {
    errorLogger.error('Error', error)
  }
}
startServer()
