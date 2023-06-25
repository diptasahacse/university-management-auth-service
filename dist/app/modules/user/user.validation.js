"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
/*
    Request Body data validation using Zod
    req.body= object
    */
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name is required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle Name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last Name is required',
                }),
            }),
            gender: zod_1.z.enum([...user_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email no is required',
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: 'Contact no is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact no is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address  is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address  is required',
            }),
            bloodGroup: zod_1.z
                .enum([...user_constant_1.bloodGroup], {
                required_error: 'Blood group is required',
            })
                .optional(),
            profileImage: zod_1.z
                .string({
                required_error: 'Profile Image  is required',
            })
                .optional(),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of Birth is required',
            }),
            academicSemester: zod_1.z.string({
                required_error: 'Academic Semester is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father Name is required',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father occupation is required',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'Father contact number is required',
                }),
                motherName: zod_1.z.string({
                    required_error: 'Mother Name is required',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother occupation is required',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother contact number is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Address is required',
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Local guardian name is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Local guardian occupation is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local guardian contact number is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Local guardian address is required',
                }),
            }),
        }),
        password: zod_1.z.string().optional(),
    }),
});
// Faculty zod schema
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name is required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle Name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last Name is required',
                }),
            }),
            gender: zod_1.z.enum([...user_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email no is required',
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: 'Contact no is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact no is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address  is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address  is required',
            }),
            bloodGroup: zod_1.z
                .enum([...user_constant_1.bloodGroup], {
                required_error: 'Blood group is required',
            })
                .optional(),
            profileImage: zod_1.z
                .string({
                required_error: 'Profile Image  is required',
            })
                .optional(),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of Birth is required',
            }),
            designation: zod_1.z.string({
                required_error: 'Designation is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
        }),
        password: zod_1.z.string().optional(),
    }),
});
// Admin zod schema
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name is required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle Name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last Name is required',
                }),
            }),
            gender: zod_1.z.enum([...user_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email no is required',
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: 'Contact no is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact no is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address  is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address  is required',
            }),
            bloodGroup: zod_1.z
                .enum([...user_constant_1.bloodGroup], {
                required_error: 'Blood group is required',
            })
                .optional(),
            profileImage: zod_1.z
                .string({
                required_error: 'Profile Image  is required',
            })
                .optional(),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of Birth is required',
            }),
            designation: zod_1.z.string({
                required_error: 'Designation is required',
            }),
            managementDepartment: zod_1.z.string({
                required_error: 'Management Department is required',
            }),
        }),
        password: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createStudentZodSchema,
    createFacultyZodSchema,
    createAdminZodSchema,
};
// id: {
//   type: String,
//   unique: true,
//   required: true,
// },
