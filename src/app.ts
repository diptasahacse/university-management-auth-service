import express, { Application, Request, Response } from 'express'
import userRouter from './app/modules/users/users.route'
import cors from 'cors'
const app: Application = express()

// Cors
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Application routes
app.use('/api/v1/users', userRouter)

// Default Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
