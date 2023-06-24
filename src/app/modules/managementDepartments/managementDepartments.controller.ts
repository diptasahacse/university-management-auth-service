import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ManagementDepartmentService } from './managementDepartments.service';
import {
  IManagementDepartment,
  IManagementDepartmentsFilters,
} from './managementDepartments.interface';
import pick from '../../../shared/pick';
import { managementDepartmentsFilterableFields } from './managementDepartments.constant';
import { paginationFields } from '../../../constants/pagination';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { managementDepartment } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartment
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully create Management Department',
      data: result,
    });
  }
);

const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters: IManagementDepartmentsFilters = pick(
      req.query,
      managementDepartmentsFilterableFields
    );

    const paginationOptions = pick(req.query, paginationFields);
    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions
    );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Management Department Retrieved Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Management Department Retrieved Successfully',
      data: result,
    });
  }
);
const updateSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Management Department Successfully',
      data: result,
    });
  }
);
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Management Department Successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateSingleManagementDepartment,
};
