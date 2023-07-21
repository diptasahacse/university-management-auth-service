import { JwtPayload, Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
const createToken = (
  payload: object,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};
const jwtVerify = (inputToken: string, refreshToken: Secret): JwtPayload => {
  return jwt.verify(inputToken, refreshToken as string) as JwtPayload;
};

export const JwtHelpers = {
  createToken,
  jwtVerify,
};
