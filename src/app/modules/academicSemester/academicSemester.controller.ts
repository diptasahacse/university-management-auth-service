import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { academicSemester } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemester
    );
    res.status(200).json({
      success: true,
      message: 'Successfully create academic semester',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = { createAcademicSemester };
