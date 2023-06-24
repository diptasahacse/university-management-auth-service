import { z } from 'zod';

const createManagementDepartmentsZodSchema = z.object({
  body: z.object({
    managementDepartment: z.object({
      title: z.string({
        required_error: 'title is required',
      }),
    }),
  }),
});

export const ManagementDepartmentsValidation = {
  createManagementDepartmentsZodSchema,
};
