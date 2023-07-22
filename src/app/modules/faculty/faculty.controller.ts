import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../constants/pagination';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { facultyFilterableFields } from './faculty.constant';
import pick from '../../../shared/pick';
import { FacultyService } from './faculty.service';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters: IFacultyFilters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FacultyService.getAllFaculty(filters, paginationOptions);
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculty Retrieved Successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await FacultyService.getSingleFaculty(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Faculty Retrieved Successfully',
      data: result,
    });
  }
);
const updateFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await FacultyService.updateFaculty(id, updatedData);
    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Faculty Successfully',
      data: result,
    });
  }
);
const deleteFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await FacultyService.deleteFaculty(id);
    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Faculty Successfully',
      data: result,
    });
  }
);

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
