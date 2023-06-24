import httpStatus from 'http-status';
import { IManagementDepartment } from './managementDepartments.interface';
import { ManagementDepartment } from './managementDepartments.model';
import ApiError from '../../../errors/ApiError';

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

// const getAllFaculty = async (
//   filters: IFacultyFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<IFaculty[]>> => {
//   const { searchTerm, ...filtersData } = filters;

//   const andConditions = [];
//   if (searchTerm) {
//     andConditions.push({
//       $or: facultySearchableFields.map((field: string) => ({
//         [field]: {
//           $regex: `${searchTerm}`,
//           $options: 'i',
//         },
//       })),
//     });
//   }
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelper.calculatePagination(paginationOptions);
//   // console.log(filtersData);
//   const sortConditions: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }

//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await Faculty.find(whereConditions)
//     .populate('academicDepartment')
//     .populate('academicFaculty')
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);
//   const total = await Faculty.countDocuments(whereConditions);
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

// const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
//   const result = await Faculty.findOne({ id })
//     .populate('academicDepartment')
//     .populate('academicFaculty');
//   return result;
// };

// const updateFaculty = async (
//   id: string,
//   payload: Partial<IFaculty>
// ): Promise<IFaculty | null> => {
//   const isExist = await Faculty.findOne({ id });
//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
//   }
//   const { name, ...facultyData } = payload;

//   const updatedFacultyData: Partial<IFaculty> = { ...facultyData };
//   /*
// const name = {

//   firstName:"Dipta", <---- update
//   lastName:"Saha"
// }

// */

//   // Dynamically Handling
//   // For Name
//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach(key => {
//       const nameKey = `name.${key}`;
//       (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
//     });
//   }

//   const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
//     new: true,
//   });
//   return result;
// };
// const deleteFaculty = async (id: string) => {
//   const ifExist = await Faculty.findOne({ id });

//   if (!ifExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, `${id} id does not exist`);
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     // Delete user
//     const userResult = await User.findOneAndDelete({ id }, { session });
//     if (!userResult) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete user');
//     }
//     // Delete faculty
//     const facultyResult = await Faculty.findOneAndDelete({ id }, { session });
//     if (!facultyResult) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
//     }

//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }

//   const result = await Faculty.findOne({ id: id })
//     .populate('academicDepartment')
//     .populate('academicFaculty');
//   return result;
// };
export const ManagementDepartmentService = {
  createManagementDepartment,
  // getAllFaculty,
  // getSingleFaculty,
  // updateFaculty,
  // deleteFaculty,
};
