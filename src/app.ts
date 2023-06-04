import express, { Application } from 'express'
import userRouter from './app/modules/users/users.route'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

// Cors
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Application routes
app.use('/api/v1/users', userRouter)

// // Default Route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Ore Baba')
//   // next('Ore Baba') // Error
// })

// Global Error Handler
app.use(globalErrorHandler)

export default app
