import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { academicFaculty } = req.body;

    const result = await AcademicFacultyService.createAcademicFaculty(
      academicFaculty
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create academic faculty',
      data: result,
    });
  }
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await AcademicFacultyService.getSingleAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single academic faculty retrieved successfully',
      data: result,
    });
  }
);
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id,
      updatedData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update academic faculty Successfully successfully',
      data: result,
    });
  }
);
const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await AcademicFacultyService.deleteAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Faculty Successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  deleteAcademicFaculty,
  updateAcademicFaculty,
};
