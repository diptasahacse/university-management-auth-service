"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, dataDetails) => {
    const responseData = {
        success: dataDetails.success,
        statusCode: dataDetails.statusCode,
        message: dataDetails.message || null,
        data: dataDetails.data || null,
        meta: dataDetails.meta || null,
    };
    res.status(dataDetails.statusCode).json(responseData);
};
exports.default = sendResponse;
