import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { JwtHelpers } from '../../helper/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      // Check if token have
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
      }

      // verify token
      let verifiedUser = null;
      verifiedUser = JwtHelpers.jwtVerify(
        token,
        config.jwt.access_secret as Secret
      );

      const { userId } = verifiedUser;
      //check is user exit
      const user = new User();
      const isUserExist = await user.isUserExist(userId);
      if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }

      // attached the verified user to req.user
      req.user = verifiedUser;

      // Authorization check
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access');
      }

      return next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
