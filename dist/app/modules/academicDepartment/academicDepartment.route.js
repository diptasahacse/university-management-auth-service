"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = (0, express_1.Router)();
// Create
router.post('/create-academic-department', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.createAcademicDepartment);
// Get Single
router.get('/:id', academicDepartment_controller_1.AcademicDepartmentController.getSingleAcademicDepartment);
// Update
router.patch('/:id', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.updateAcademicDepartment);
// Get All
router.get('/', academicDepartment_controller_1.AcademicDepartmentController.getAllAcademicDepartment);
// Delete
router.delete('/:id', academicDepartment_controller_1.AcademicDepartmentController.deleteAcademicDepartment);
exports.AcademicDepartmentRoutes = router;
