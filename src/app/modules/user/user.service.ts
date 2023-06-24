import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
// import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
// import { generateStudentId } from './user.utils';

// const createStudent = async (
//   student: IStudent,
//   user: IUser
// ): Promise<IUser | null | never> => {
//   // Default
//   if (!user.password) {
//     user.password = config.default_student_password as string;
//   }

//   // Set Role
//   user.role = 'student';

//   // Academic semester
//   const academicSemester = await AcademicSemester.findById(
//     student.academicSemester
//   );

//   // Transaction and rollback
//   // Generate student id
//   let newUserAllData:IUser |null = null;
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     const id = await generateStudentId(academicSemester as IAcademicSemester);
//     user.id = id;
//     student.id = id;
//     const newStudent = await Student.create([student], { session });

//     if (!newStudent.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
//     }

//     // set student -> _id into user.student
//     user.student = newStudent[0]._id;

//     // Create user
//     const [newUser] = await User.create([user], { session });
//     if (!newUser) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }

//     newUserAllData = newUser;

//     // End Transaction - commit
//     await session.commitTransaction();

//     // End Session
//     await session.endSession();
//   } catch (error) {
//     // Rollback any data changes - keep data as before
//     await session.abortTransaction();
//     // End Session
//     await session.endSession();

//     throw error;
//   }
//   // user => student--> academicSemester, academicDepartment, academicFaculty
//   if (newUserAllData) {
//     newUserAllData = await User.find({ id: newUserAllData.id }).populate({
//       path: 'student',
//       populate: [
//         {
//           path: 'academicSemester',
//         },
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicSemester',
//         },
//       ],
//     });
//   }
//   return newUserAllData;
// };

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  // set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateStudentId(academicSemester as IAcademicSemester);

    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

// Need modify
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_password as string;
  }

  // set role
  user.role = 'faculty';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateFacultyId();

    user.id = id;
    faculty.id = id;

    //array
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    //set faculty -->  _id into user.faculty
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const getUser = async (): Promise<IUser[]> => {
  return await User.find({}, { _id: 0 });
};
export const UserService = {
  createStudent,
  getUser,
  createFaculty,
};
