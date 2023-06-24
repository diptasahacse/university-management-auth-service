import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentsValidation } from './managementDepartments.validation';
import { ManagementDepartmentController } from './managementDepartments.controller';

const router = Router();
// Student
// Create single semester
router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentsValidation.createManagementDepartmentsZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartment);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentsValidation.updateManagementDepartmentsZodSchema
  ),
  ManagementDepartmentController.updateSingleManagementDepartment
);

export const ManagementDepartmentRoutes = router;
