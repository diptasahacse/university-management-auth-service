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

// router.get('/:id', FacultyController.getSingleFaculty);

// router.get('/', FacultyController.getAllFaculty);
// router.delete('/:id', FacultyController.deleteFaculty);

// router.patch(
//   '/:id',
//   validateRequest(FacultyValidation.updateFacultyZodSchema),
//   FacultyController.updateFaculty
// );

export const ManagementDepartmentRoutes = router;
