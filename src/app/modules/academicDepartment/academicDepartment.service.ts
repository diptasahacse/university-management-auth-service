import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
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
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

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

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  console.log(whereConditions);

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

const getSingleAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: IAcademicDepartment
) => {
  const ifExist = await AcademicDepartment.findById(id);
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `${id} id does not exist`);
  }

  const result = (
    await AcademicDepartment.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    })
  )?.populate('academicFaculty');
  return result;
};

const deleteAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const ifExist = await AcademicDepartment.findById(id);

  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `${id} id does not exist`);
  }

  const result = await AcademicDepartment.findOneAndDelete({ _id: id });
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
