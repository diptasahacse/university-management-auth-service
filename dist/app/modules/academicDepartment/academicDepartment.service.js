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
exports.AcademicDepartmentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const academicDepartment_model_1 = require("./academicDepartment.model");
const academicDepartment_constant_1 = require("./academicDepartment.constant");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const createAcademicDepartment = (academicDepartment) => __awaiter(void 0, void 0, void 0, function* () {
    const createAcademicDepartment = (yield academicDepartment_model_1.AcademicDepartment.create(academicDepartment)).populate('academicFaculty');
    if (!createAcademicDepartment) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create academic department');
    }
    return createAcademicDepartment;
});
const getAllAcademicDepartment = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicDepartment_constant_1.academicDepartmentSearchableFields.map((field) => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    console.log(whereConditions);
    const result = yield academicDepartment_model_1.AcademicDepartment.find(whereConditions)
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield academicDepartment_model_1.AcademicDepartment.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAcademicDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.findById(id);
    return result;
});
const updateAcademicDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ifExist = yield academicDepartment_model_1.AcademicDepartment.findById(id);
    if (!ifExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `${id} id does not exist`);
    }
    const result = (_a = (yield academicDepartment_model_1.AcademicDepartment.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    }))) === null || _a === void 0 ? void 0 : _a.populate('academicFaculty');
    return result;
});
const deleteAcademicDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield academicDepartment_model_1.AcademicDepartment.findById(id);
    if (!ifExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `${id} id does not exist`);
    }
    const result = yield academicDepartment_model_1.AcademicDepartment.findOneAndDelete({ _id: id });
    return result;
});
exports.AcademicDepartmentService = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
    deleteAcademicDepartment,
};
