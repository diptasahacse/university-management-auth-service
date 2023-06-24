import { Schema, model } from 'mongoose';
import {
  IManagementDepartment,
  ManagementDepartmentsModel,
} from './managementDepartments.interface';

export const ManagementDepartmentSchema = new Schema<
  IManagementDepartment,
  ManagementDepartmentsModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentsModel
>('ManagementDepartment', ManagementDepartmentSchema);
