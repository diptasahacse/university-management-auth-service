import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
const createUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'Successfully created user',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await UserService.getUser();
    res.status(200).json({
      success: true,
      message: 'Successfully created user',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user',
    });
  }
};
export const UserController = { createUser, getUser };
