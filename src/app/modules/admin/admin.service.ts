import mongoose, { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { adminSearchableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map((field: string) => ({
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

  const result = await Admin.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id }).populate('managementDepartment');
  return result;
};
const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  const { name, ...adminData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  // Dynamically Handling
  // For Name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });
  return result;
};
const deleteAdmin = async (id: string) => {
  const ifExist = await Admin.findOne({ id });

  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `${id} id does not exist`);
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Delete user
    const userResult = await User.findOneAndDelete({ id }, { session });
    if (!userResult) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    // Delete admin
    const adminResult = await Admin.findOneAndDelete({ id }, { session });
    if (!adminResult) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  const result = await Admin.findOne({ id: id }).populate(
    'managementDepartment'
  );
  return result;
};
export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
