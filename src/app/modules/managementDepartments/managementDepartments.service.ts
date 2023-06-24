import httpStatus from 'http-status';
import {
  IManagementDepartment,
  IManagementDepartmentsFilters,
} from './managementDepartments.interface';
import { ManagementDepartment } from './managementDepartments.model';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { managementDepartmentsSearchableFields } from './managementDepartments.constant';
import { paginationHelper } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

const createManagementDepartment = async (
  managementDepartment: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const createManagementDepartment = await ManagementDepartment.create(
    managementDepartment
  );

  if (!createManagementDepartment) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create Management Department'
    );
  }
  return createManagementDepartment;
};

const getAllManagementDepartment = async (
  filters: IManagementDepartmentsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentsSearchableFields.map((field: string) => ({
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
  // console.log(filtersData);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
) => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
const deleteManagementDepartment = async (id: string) => {
  const ifExist = await ManagementDepartment.findById(id);

  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `${id} id does not exist`);
  }

  const result = await ManagementDepartment.findOneAndDelete({ _id: id });
  return result;
};
export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
};
