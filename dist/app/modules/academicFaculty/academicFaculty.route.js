"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const router = (0, express_1.Router)();
// Create
router.post('/create-academic-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.createAcademicFacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.createAcademicFaculty);
// Get Single
router.get('/:id', academicFaculty_controller_1.AcademicFacultyController.getSingleAcademicFaculty);
// Update
router.patch('/:id', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.updateAcademicFacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.updateAcademicFaculty);
// Get All
router.get('/', academicFaculty_controller_1.AcademicFacultyController.getAllAcademicFaculty);
// Delete
router.delete('/:id', academicFaculty_controller_1.AcademicFacultyController.deleteAcademicFaculty);
exports.AcademicFacultyRoutes = router;
