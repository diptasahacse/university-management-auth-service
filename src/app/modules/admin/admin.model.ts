import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from '../user/user.constant';
import { AdminModel, IAdmin } from './admin.interface';

export const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    gender: {
      type: String,
      enum: gender,
    },
    dateOfBirth: {
      type: String,
    },

    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    profileImage: {
      type: String,
      // required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
