"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = require("express");
// import validateRequest from '../../middlewares/validateRequest';
// import { UserValidation } from '../user/user.validation';
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_validation_1 = require("./student.validation");
const router = (0, express_1.Router)();
// Student
//
router.get('/:id', student_controller_1.StudentController.getSingleStudent);
router.get('/', student_controller_1.StudentController.getAllStudent);
router.delete('/:id', student_controller_1.StudentController.deleteStudent);
router.patch('/:id', (0, validateRequest_1.default)(student_validation_1.StudentValidation.updateStudentZodSchema), student_controller_1.StudentController.updateStudent);
exports.StudentRoutes = router;
