import User from "../model/UserModel";

export async function getUserById(id: number) {
  return await User.findByPk(id);
}