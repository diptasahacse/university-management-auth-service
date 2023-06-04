import { Router } from 'express'
import usersController from './users.controller'
const router = Router()
router.post('/create-user', usersController.createUser)
router.get('/all-users', usersController.getUser)

export default router
