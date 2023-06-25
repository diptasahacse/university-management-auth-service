"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const managementDepartments_service_1 = require("./managementDepartments.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const managementDepartments_constant_1 = require("./managementDepartments.constant");
const pagination_1 = require("../../../constants/pagination");
const createManagementDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { managementDepartment } = req.body;
    const result = yield managementDepartments_service_1.ManagementDepartmentService.createManagementDepartment(managementDepartment);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully create Management Department',
        data: result,
    });
}));
const getAllManagementDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, managementDepartments_constant_1.managementDepartmentsFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield managementDepartments_service_1.ManagementDepartmentService.getAllManagementDepartment(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Management Department Retrieved Successfully',
        data: result.data,
        meta: result.meta,
    });
}));
const getSingleManagementDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield managementDepartments_service_1.ManagementDepartmentService.getSingleManagementDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Management Department Retrieved Successfully',
        data: result,
    });
}));
const updateSingleManagementDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield managementDepartments_service_1.ManagementDepartmentService.updateManagementDepartment(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Update Management Department Successfully',
        data: result,
    });
}));
const deleteManagementDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield managementDepartments_service_1.ManagementDepartmentService.deleteManagementDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delete Management Department Successfully',
        data: result,
    });
}));
exports.ManagementDepartmentController = {
    createManagementDepartment,
    getAllManagementDepartment,
    getSingleManagementDepartment,
    deleteManagementDepartment,
    updateSingleManagementDepartment,
};
