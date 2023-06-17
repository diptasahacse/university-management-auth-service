import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);
router.get(
  '/:id',

  AcademicFacultyController.getSingleAcademicFaculty
);
router.delete(
  '/:id',

  AcademicFacultyController.deleteAcademicFaculty
);

export const AcademicFacultyRoutes = router;
