import { Response } from 'express';
type IApiResponse<T> = {
  statusCode: number;
  message?: string | null;
  success: boolean;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
  data?: T | null;
};
const sendResponse = <T>(res: Response, dataDetails: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    success: dataDetails.success,
    statusCode: dataDetails.statusCode,
    message: dataDetails.message || null,
    data: dataDetails.data || null,
    meta: dataDetails.meta || null,
  };
  res.status(dataDetails.statusCode).json(responseData);
};

export default sendResponse;
