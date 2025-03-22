import { Request, Response } from "express";
import { IUser, User } from "../model/UserModel";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config";
import bcrypt from "bcrypt";

export const findUserById = async (id: number) => {
  return await User.findByPk(id);
};

export const insertUser = async ({
  name,
  email,
  passwd,
  cpf,
  access,
}: Omit<IUser, "id" | "createdAt" | "updatedAt">) => {
  try {
    const newUser = await User.create({
      name,
      email,
      passwd,
      cpf,
      access,
    });

    return newUser;
  } catch (error) {
    throw new Error("[ERRO] Falha ao criar usuário.");
  }
};

export const getAll = async (req: Request, res: Response) => {};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {};

export const alterUser = async (
  id: number,
  updateData: Partial<Omit<IUser, "id" | "email" | "createdAt" | "updatedAt">>
) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuário ou senha inválidos.");
    }

    if (updateData.passwd) {
      updateData.passwd = await bcrypt.hash(updateData.passwd, 10);
    }

    await user.update(updateData);
    return user;
  } catch (error) {
    throw new Error("Erro ao atualizar usuário.");
  }
};


export const deleteUser = async (id: number) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    await user.destroy();
    return { message: "Usuário excluído com sucesso." };
  } catch (error) {
    throw new Error("Erro ao excluir usuário.");
  }
};

export const whoAmI = async (id: number) => {
    try {
      const user = await User.findByPk(id, {
        attributes: ["id", "name", "email", "access", "createdAt", "updatedAt"],
      });
  
      if (!user) {
        throw new Error("Usuário ou senha inválidos.");
      }
  
      return user;
    } catch (error) {
      throw new Error("Erro ao buscar usuário.");
    }
  };
