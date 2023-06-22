import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
const createStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { student, ...user } = req.body;

    const result = await UserService.createStudent(student, user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create student',
      data: result,
    });
  }
);
const createFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { faculty, ...user } = req.body;

    const result = await UserService.createFaculty(faculty, user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create faculty',
      data: result,
    });
  }
);

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
export const UserController = { createStudent, createFaculty, getUser };
