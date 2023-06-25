import dotenv from 'dotenv';
import path from 'path';

// process.cwd() => Current Directory
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_uri:
    process.env.NODE_ENV == 'development'
      ? process.env.DATABASE_URI
      : process.env.DATABASE_URI,
  default_student_password: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASS,
  default_admin_password: process.env.DEFAULT_ADMIN_PASS,
};
