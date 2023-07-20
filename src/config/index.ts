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
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET_KEY,
    access_secret_expire_in: process.env.JWT_ACCESS_SECRET_KEY_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET_KEY,
    refresh_secret_expire_in: process.env.JWT_REFRESH_SECRET_KEY_EXPIRES_IN,
  },
};
