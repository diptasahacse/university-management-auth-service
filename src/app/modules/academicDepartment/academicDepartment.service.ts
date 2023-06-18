import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { IAcademicFacultyFilters } from '../academicFaculty/academicFaculty.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import { paginationHelper } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

const createAcademicDepartment = async (
  academicDepartment: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const createAcademicDepartment = (
    await AcademicDepartment.create(academicDepartment)
  ).populate('academicFaculty');

  if (!createAcademicDepartment) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create academic department'
    );
  }
  return createAcademicDepartment;
};

const getAllAcademicDepartment = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map((field: string) => ({
        [field]: {
          $regex: `${searchTerm}`,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
};
