import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'
const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'Successfully created user',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await usersService.getUser()
    res.status(200).json({
      success: true,
      message: 'Successfully created user',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user',
    })
  }
}
export default { createUser, getUser }
