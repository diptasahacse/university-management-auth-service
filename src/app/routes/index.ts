import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/academic-semester',
    routes: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach(item => router.use(item.path, item.routes));

export default router;
