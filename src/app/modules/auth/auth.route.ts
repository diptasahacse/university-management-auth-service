import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

// Login
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.userLogin
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

// // Change Password
// router.post('/change-password');

// // Change Password
// router.post('/refresh-token');

export const AuthRoutes = router;

// auth/login (POST)
// id
// password
// auth/change-password (POST)
// auth/refresh-token (POST)

// auth/forgot-password(POST)
// auth/reset-password (POST)
