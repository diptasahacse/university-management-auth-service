import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const message = 'Cast Error';
  const statusCode = 400;
  const errors: IGenericErrorMessage[] = [
    {
      path: error?.path,
      message: 'Invalid Id',
    },
  ];
  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};
export default handleCastError;
