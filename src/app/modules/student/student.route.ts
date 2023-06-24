import { Router } from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { UserValidation } from '../user/user.validation';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = Router();
// Student

//
router.get('/:id', StudentController.getSingleStudent);

router.get('/', StudentController.getAllStudent);
router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
