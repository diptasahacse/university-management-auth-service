import dotenv from 'dotenv'
import path from 'path'

// process.cwd() => Current Directory
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  default_user_password: process.env.DEFAULT_USER_PASS,
}
