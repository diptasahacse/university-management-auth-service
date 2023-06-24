import { z } from 'zod';
import { bloodGroup, gender } from './user.constant';
/*
    Request Body data validation using Zod
    req.body= object
    */
const createStudentZodSchema = z.object({
  body: z.object({
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle Name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      email: z
        .string({
          required_error: 'Email no is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact no is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact no is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address  is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address  is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),
      profileImage: z
        .string({
          required_error: 'Profile Image  is required',
        })
        .optional(),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
    }),
    password: z.string().optional(),
  }),
});

// Faculty zod schema
const createFacultyZodSchema = z.object({
  body: z.object({
    faculty: z.object({}),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
};

// id: {
//   type: String,
//   unique: true,
//   required: true,
// },
