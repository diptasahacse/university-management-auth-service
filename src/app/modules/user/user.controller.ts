import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
const createStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { student, ...user } = req.body;
    // console.log(req.cookies, 'cookie');
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
const createAdmin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { admin, ...user } = req.body;

    const result = await UserService.createAdmin(admin, user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create admin',
      data: result,
    });
  }
);

export const UserController = { createStudent, createFaculty, createAdmin };
