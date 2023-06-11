import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  /*
    We need  and 
    1. Auto Generated Incremental ID
    2. Default password

    */

  // 1. Auto Generated Incremental ID
  const id = await generateUserId()
  user.id = id
  // 2. Default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user')
  }
  return createdUser
}

const getUser = async (): Promise<IUser[]> => {
  return await User.find({}, { _id: 0 })
}
export const UserService = {
  createUser,
  getUser,
}
