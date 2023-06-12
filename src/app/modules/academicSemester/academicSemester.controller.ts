import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { academicSemester } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemester
    );

    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create academic semester',
      data: result,
    });
  }
);

export const AcademicSemesterController = { createAcademicSemester };
