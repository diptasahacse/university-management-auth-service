import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (
  academicSemester: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  // Here, I have to match title with code
  if (
    academicSemesterTitleCodeMapper[academicSemester.title] !==
    academicSemester.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
  }

  const createAcademicSemester = await AcademicSemester.create(
    academicSemester
  );

  if (!createAcademicSemester) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create academic semester'
    );
  }
  return createAcademicSemester;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
