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
exports.AcademicFacultyService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const academicFaculty_model_1 = require("./academicFaculty.model");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const createAcademicFaculty = (academicFaculty) => __awaiter(void 0, void 0, void 0, function* () {
    const createAcademicFaculty = yield academicFaculty_model_1.AcademicFaculty.create(academicFaculty);
    if (!createAcademicFaculty) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create academic faculty');
    }
    return createAcademicFaculty;
});
const getAllAcademicFaculty = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicFaculty_constant_1.academicFacultySearchableFields.map((field) => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicFaculty_model_1.AcademicFaculty.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield academicFaculty_model_1.AcademicFaculty.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAcademicFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    return result;
});
const updateAcademicFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    if (!ifExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `${id} id does not exist`);
    }
    const result = yield academicFaculty_model_1.AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteAcademicFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    if (!ifExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `${id} id does not exist`);
    }
    const result = yield academicFaculty_model_1.AcademicFaculty.findOneAndDelete({ _id: id });
    return result;
});
exports.AcademicFacultyService = {
    createAcademicFaculty,
    getSingleAcademicFaculty,
    deleteAcademicFaculty,
    updateAcademicFaculty,
    getAllAcademicFaculty,
};
