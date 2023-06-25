"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const student_route_1 = require("../modules/student/student.route");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const managementDepartments_route_1 = require("../modules/managementDepartments/managementDepartments.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/academic-semester',
        routes: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        routes: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        routes: academicDepartment_route_1.AcademicDepartmentRoutes,
    },
    {
        path: '/management-departments',
        routes: managementDepartments_route_1.ManagementDepartmentRoutes,
    },
    {
        path: '/students',
        routes: student_route_1.StudentRoutes,
    },
    {
        path: '/faculty',
        routes: faculty_route_1.FacultyRoutes,
    },
    {
        path: '/admin',
        routes: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.forEach(item => router.use(item.path, item.routes));
exports.default = router;
