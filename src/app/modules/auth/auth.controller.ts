/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import config from '../../../config';
import { IRefreshTokenResponse } from './auth.interface';
import ApiError from '../../../errors/ApiError';

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
const refreshToken = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);

    // Set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token created successfully',
      data: result,
    });
  }
);
const changePassword = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const passwordData = req.body;
    const userData = req.user;

    const result = await AuthService.changePassword(passwordData, userData);
    if (!result) {
      throw new ApiError(httpStatus.CONFLICT, 'Something went wrong');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
    });
  }
);

export const AuthController = {
  userLogin,
  refreshToken,
  changePassword,
};
