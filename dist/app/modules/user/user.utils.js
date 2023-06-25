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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.getLastAdminId = exports.generateFacultyId = exports.getLastFacultyId = exports.generateStudentId = exports.getLastStudentId = void 0;
const user_model_1 = require("./user.model");
// Student
const getLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    // eslint-disable-next-line no-undefined
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id.substring(4) : undefined;
});
exports.getLastStudentId = getLastStudentId;
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.getLastStudentId)()) || (0).toString().padStart(8, '0'); //00000000
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(8, '0');
    //2025
    if (academicSemester) {
        incrementedId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementedId}`;
    }
    return incrementedId;
    // console.log(incrementedId);
});
exports.generateStudentId = generateStudentId;
// Faculty
const getLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    // eslint-disable-next-line no-undefined
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id.substring(2) : undefined;
});
exports.getLastFacultyId = getLastFacultyId;
//F-00000001
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.getLastFacultyId)()) || (0).toString().padStart(8, '0'); //00000000
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(8, '0');
    //2025
    incrementedId = `F-${incrementedId}`;
    return incrementedId;
    // console.log(incrementedId);
});
exports.generateFacultyId = generateFacultyId;
// Admin
const getLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield user_model_1.User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    // eslint-disable-next-line no-undefined
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id.substring(2) : undefined;
});
exports.getLastAdminId = getLastAdminId;
//A-00000001
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.getLastAdminId)()) || (0).toString().padStart(8, '0'); //00000000
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(8, '0');
    //2025
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
    // console.log(incrementedId);
});
exports.generateAdminId = generateAdminId;
