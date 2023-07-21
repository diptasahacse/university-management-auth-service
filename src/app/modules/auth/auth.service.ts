import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JwtHelpers } from '../../../helper/jwtHelpers';
const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  //   console.log(payload);
  const user = new User();

  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   Check Hash password
  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  // JWT
  const {
    id: userId,
    role,
    needPasswordChange: isNeedPasswordChange,
  } = isUserExist;
  // Create access token
  const accessToken = JwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_secret_expire_in as string
  );

  // Create refresh token
  const refreshToken = JwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: isNeedPasswordChange as boolean,
  };
};
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.jwtVerify(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { userId } = verifiedToken;
  const user = new User();

  // Check if it is not a deleted user account
  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Generate new Token
  const accessToken = JwtHelpers.createToken(
    { userId: isUserExist.id, role: isUserExist.role },
    config.jwt.access_secret as Secret,
    config.jwt.access_secret_expire_in as string
  );
  return {
    accessToken,
  };
};
export const AuthService = {
  userLogin,
  refreshToken,
};
