import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import logger from './shared/logger'
const startServer = async () => {
  try {
    await mongoose.connect(config.database_uri as string)
    logger.info('Database is Connected')

    app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`)
    })
  } catch (error: any) {
    logger.error('Error', error.message)
  }
}
startServer()
