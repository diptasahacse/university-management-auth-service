import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (
  academicSemester: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  const createAcademicSemester = await AcademicSemester.create(
    academicSemester
  );

  if (!createAcademicSemester) {
    throw new ApiError(400, 'Failed to create academic semester');
  }
  return createAcademicSemester;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
