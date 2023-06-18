import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { academicDepartment } = req.body;

    const result = await AcademicDepartmentService.createAcademicDepartment(
      academicDepartment
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create academic department',
      data: result,
    });
  }
);
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters: IAcademicDepartmentFilters = pick(
      req.query,
      academicDepartmentFilterableFields
    );

    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicDepartmentService.getAllAcademicDepartment(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department Retrieved Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);
export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
};
