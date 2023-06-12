import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { academicSemester } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemester
    );

    next();
    res.status(200).json({
      success: true,
      message: 'Successfully create academic semester',
      data: result,
    });
  }
);

export const AcademicSemesterController = { createAcademicSemester };
