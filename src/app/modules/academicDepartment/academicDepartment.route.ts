import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = Router();
// Create
router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
);
// Get Single
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

// Update
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);
// Get All
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

// Delete
router.delete(
  '/:id',

  AcademicDepartmentController.deleteAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
