import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { academicSemester } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemester
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create academic semester',
      data: result,
    });
  }
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const filters: IAcademicSemesterFilters = pick(req.query, ['searchTerm']);

    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicSemesterService.getAllAcademicSemesters(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Retrieved Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
};
