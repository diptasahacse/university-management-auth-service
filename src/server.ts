import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
const startServer = async () => {
  try {
    await mongoose.connect(config.database_uri as string)
    console.log('Database is Connected')

    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`)
    })
  } catch (error: any) {
    console.log(error.message)
  }
}
startServer()
