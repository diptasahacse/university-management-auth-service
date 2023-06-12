import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = Router();

router.use('/users', UserRoutes);
router.use('/academic-semester', AcademicSemesterRoutes);

export default router;
