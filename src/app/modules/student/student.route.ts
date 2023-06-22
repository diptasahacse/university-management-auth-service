import { Router } from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { UserValidation } from '../user/user.validation';
import { StudentController } from './student.controller';

const router = Router();
// Student

//
router.get('/:id', StudentController.getSingleStudent);

router.get('/', StudentController.getAllStudent);
router.delete('/:id', StudentController.deleteStudent);

// router.patch(
//   '/create-student',
//   validateRequest(UserValidation.createStudentZodSchema),
//   StudentController.createStudent
// );

export const StudentRoutes = router;
