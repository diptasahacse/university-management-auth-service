import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDepartments/managementDepartments.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id: string;
  name: UserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
  profileImage?: string; // // reference
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  email?: string;
  designation?: string;
  bloodGroup?: string;
};
