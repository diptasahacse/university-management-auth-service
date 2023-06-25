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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const managementDepartments_model_1 = require("./managementDepartments.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const managementDepartments_constant_1 = require("./managementDepartments.constant");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const createManagementDepartment = (managementDepartment) => __awaiter(void 0, void 0, void 0, function* () {
    const createManagementDepartment = yield managementDepartments_model_1.ManagementDepartment.create(managementDepartment);
    if (!createManagementDepartment) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Management Department');
    }
    return createManagementDepartment;
});
const getAllManagementDepartment = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: managementDepartments_constant_1.managementDepartmentsSearchableFields.map((field) => ({
                [field]: {
                    $regex: `${searchTerm}`,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    // console.log(filtersData);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield managementDepartments_model_1.ManagementDepartment.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield managementDepartments_model_1.ManagementDepartment.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleManagementDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield managementDepartments_model_1.ManagementDepartment.findById(id);
    return result;
});
const updateManagementDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield managementDepartments_model_1.ManagementDepartment.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteManagementDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield managementDepartments_model_1.ManagementDepartment.findById(id);
    if (!ifExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `${id} id does not exist`);
    }
    const result = yield managementDepartments_model_1.ManagementDepartment.findOneAndDelete({ _id: id });
    return result;
});
exports.ManagementDepartmentService = {
    createManagementDepartment,
    getAllManagementDepartment,
    getSingleManagementDepartment,
    deleteManagementDepartment,
    updateManagementDepartment,
};
