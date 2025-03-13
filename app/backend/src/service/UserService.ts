import User from "../model/UserModel";
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';

export async function getUserById(id: number) {
  return await User.findByPk(id);
};

