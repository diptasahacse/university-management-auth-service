import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// export const getLastUserId = async () => {
//   const lastUser = await User.findOne({}, { id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean();
//   return lastUser?.id;
// };

// export const generateUserId = async () => {
//   const currentId = (await getLastUserId()) || (0).toString().padStart(8, '0'); //00000000
//   const incrementedId = (parseInt(currentId) + 1).toString().padStart(8, '0');
//   return incrementedId;
// };

// Student
export const getLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  // eslint-disable-next-line no-undefined
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await getLastStudentId()) || (0).toString().padStart(8, '0'); //00000000

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(8, '0');
  //2025
  if (academicSemester) {
    incrementedId = `${academicSemester.year.substring(2)}${
      academicSemester.code
    }${incrementedId}`;
  }

  return incrementedId;
  // console.log(incrementedId);
};

// Faculty
export const getLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  // eslint-disable-next-line no-undefined
  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};
//F-00000001
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await getLastFacultyId()) || (0).toString().padStart(8, '0'); //00000000

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(8, '0');
  //2025
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
  // console.log(incrementedId);
};
