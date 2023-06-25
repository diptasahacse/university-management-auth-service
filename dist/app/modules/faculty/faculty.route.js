"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = require("express");
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const router = (0, express_1.Router)();
// Student
router.get('/:id', faculty_controller_1.FacultyController.getSingleFaculty);
router.get('/', faculty_controller_1.FacultyController.getAllFaculty);
router.delete('/:id', faculty_controller_1.FacultyController.deleteFaculty);
router.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.FacultyValidation.updateFacultyZodSchema), faculty_controller_1.FacultyController.updateFaculty);
exports.FacultyRoutes = router;
