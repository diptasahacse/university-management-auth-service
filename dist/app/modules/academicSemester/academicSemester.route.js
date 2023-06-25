"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = (0, express_1.Router)();
// Create single semester
router.post('/create-academic-semester', (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.createAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.createAcademicSemester);
// Get single semester
router.get('/:id', academicSemester_controller_1.AcademicSemesterController.getSingleAcademicSemester);
// Update Semester
router.patch('/:id', (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.updateAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.updateSemester);
// Delete semester
router.delete('/:id', academicSemester_controller_1.AcademicSemesterController.deleteSemester);
// Get all semester
router.get('/', academicSemester_controller_1.AcademicSemesterController.getAllAcademicSemesters);
exports.AcademicSemesterRoutes = router;
