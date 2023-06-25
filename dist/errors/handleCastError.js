"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const message = 'Cast Error';
    const statusCode = 400;
    const errors = [
        {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: 'Invalid Id',
        },
    ];
    return {
        statusCode,
        message,
        errorMessages: errors,
    };
};
exports.default = handleCastError;
