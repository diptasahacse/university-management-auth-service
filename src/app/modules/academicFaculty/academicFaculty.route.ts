import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = Router();

// Create
router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);
// Get Single
router.get(
  '/:id',

  AcademicFacultyController.getSingleAcademicFaculty
);
// Update
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
);
// Get All
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
// Delete
router.delete(
  '/:id',

  AcademicFacultyController.deleteAcademicFaculty
);

export const AcademicFacultyRoutes = router;
