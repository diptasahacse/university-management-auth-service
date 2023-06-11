import { z } from 'zod';
/*
    Request Body data validation using Zod
    req.body= object
    */
const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
});
export const UserValidation = {
  createUserZodSchema,
};
