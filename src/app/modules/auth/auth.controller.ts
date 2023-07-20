/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import config from '../../../config';

const userLogin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const result = await AuthService.userLogin(data);

    const { refreshToken, ...rest } = result;
    // Set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login successful',
      data: rest,
    });
  }
);

export const AuthController = {
  userLogin,
};
