import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { IAdmin, IAdminFilters } from './admin.interface';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';
import { paginationFields } from '../../../constants/pagination';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters: IAdminFilters = pick(req.query, adminFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await AdminService.getAllAdmin(filters, paginationOptions);
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Admin Retrieved Successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleAdmin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await AdminService.getSingleAdmin(id);

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Admin Retrieved Successfully',
      data: result,
    });
  }
);
const updateAdmin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await AdminService.updateAdmin(id, updatedData);
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Admin Successfully',
      data: result,
    });
  }
);
const deleteAdmin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await AdminService.deleteAdmin(id);
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Admin Successfully',
      data: result,
    });
  }
);

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
