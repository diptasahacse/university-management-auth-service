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
import { academicSemesterFilterableFields } from './academicSemester.constant';

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
    const filters: IAcademicSemesterFilters = pick(
      req.query,
      academicSemesterFilterableFields
    );

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

const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await AcademicSemesterService.getSingleAcademicSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Semester Retrieved Successfully',
      data: result,
    });
  }
);
const updateSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await AcademicSemesterService.updateSemester(
      id,
      updatedData
    );
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Semester Successfully',
      data: result,
    });
  }
);
const deleteSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await AcademicSemesterService.deleteSemester(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Semester Successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSemester,
  deleteSemester,
};
