import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFaculty = async (
  academicFaculty: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const createAcademicFaculty = await AcademicFaculty.create(academicFaculty);

  if (!createAcademicFaculty) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create academic faculty'
    );
  }
  return createAcademicFaculty;
};
const getSingleAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFaculty = async (id: string, payload: IAcademicFaculty) => {
  const ifExist = await AcademicFaculty.findById(id);

  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `${id} id does not exist`);
  }

  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const ifExist = await AcademicFaculty.findById(id);

  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `${id} id does not exist`);
  }

  const result = await AcademicFaculty.findOneAndDelete({ _id: id });
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  deleteAcademicFaculty,
  updateAcademicFaculty,
};
