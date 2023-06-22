import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IStudent, IStudentFilters } from './student.interface';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './student.constant';
import { paginationFields } from '../../../constants/pagination';
import { StudentService } from './student.service';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters: IStudentFilters = pick(req.query, studentFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await StudentService.getAllStudent(filters, paginationOptions);
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Student Retrieved Successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await StudentService.getSingleStudent(id);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Student Retrieved Successfully',
      data: result,
    });
  }
);
const updateStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await StudentService.updateStudent(id, updatedData);
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Student Successfully',
      data: result,
    });
  }
);
const deleteStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await StudentService.deleteStudent(id);
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Student Successfully',
      data: result,
    });
  }
);

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
