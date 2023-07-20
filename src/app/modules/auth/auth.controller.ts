/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const userLogin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const result = await AuthService.userLogin(data);
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Successfully create student',
    //   data: data,
    // });
  }
);

export const AuthController = {
  userLogin,
};
