"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const managementDepartments_validation_1 = require("./managementDepartments.validation");
const managementDepartments_controller_1 = require("./managementDepartments.controller");
const router = (0, express_1.Router)();
router.post('/create-management', (0, validateRequest_1.default)(managementDepartments_validation_1.ManagementDepartmentsValidation.createManagementDepartmentsZodSchema), managementDepartments_controller_1.ManagementDepartmentController.createManagementDepartment);
router.get('/:id', managementDepartments_controller_1.ManagementDepartmentController.getSingleManagementDepartment);
router.get('/', managementDepartments_controller_1.ManagementDepartmentController.getAllManagementDepartment);
router.delete('/:id', managementDepartments_controller_1.ManagementDepartmentController.deleteManagementDepartment);
router.patch('/:id', (0, validateRequest_1.default)(managementDepartments_validation_1.ManagementDepartmentsValidation.updateManagementDepartmentsZodSchema), managementDepartments_controller_1.ManagementDepartmentController.updateSingleManagementDepartment);
exports.ManagementDepartmentRoutes = router;
