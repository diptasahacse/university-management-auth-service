import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartments/managementDepartments.route';
import { AdminRoutes } from '../modules/admin/admin.route';

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
  {
    path: '/academic-faculty',
    routes: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    routes: AcademicDepartmentRoutes,
  },
  {
    path: '/management-departments',
    routes: ManagementDepartmentRoutes,
  },
  {
    path: '/students',
    routes: StudentRoutes,
  },
  {
    path: '/faculty',
    routes: FacultyRoutes,
  },
  {
    path: '/admin',
    routes: AdminRoutes,
  },
];

moduleRoutes.forEach(item => router.use(item.path, item.routes));

export default router;
