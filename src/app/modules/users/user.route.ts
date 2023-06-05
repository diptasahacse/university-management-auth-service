import { Router } from 'express'
import { UserController } from './user.controller'
const router = Router()
router.post('/create-user', UserController.createUser)
router.get('/all-users', UserController.getUser)

export const UserRoutes = router
