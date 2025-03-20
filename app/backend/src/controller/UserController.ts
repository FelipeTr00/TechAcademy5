import { Request, Response } from "express";
import {
  findUserById,
  insertUser,
  alterUser,
  deleteUser,
  whoAmI
} from "../service/UserService";

export async function getUserById(req: Request, res: Response) {
  const userId = (req as any).user.id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "ID do usuário não encontrado no token." });
  }

  try {
    const user = await findUserById(Number(userId));

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
}

export const getMe = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; 

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    const user = await whoAmI(userId);
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Erro desconhecido.",
      });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, passwd1, passwd2, access } = req.body;

  if (!name || !email || !passwd1 || !passwd2 || !access) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  if (passwd1 !== passwd2) {
    return res.status(400).json({ message: "Senhas diferentes." });
  }

  try {
    const newUser = await insertUser({ name, email, passwd: passwd1, access });

    res.status(201).json({ message: "[SUCESSO]", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "[ERRO]" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
    
  const userId = (req as any).user.id;
  const updateData = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    const updatedUser = await alterUser(userId, updateData);
    res.status(200).json({ message: "[SUCESSO]", user: updatedUser });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Erro desconhecido.";
    res.status(500).json({ message: errMessage });
  }
};

export const patchUser = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const updateData = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    const updatedUser = await alterUser(userId, updateData);
    res.status(200).json({ message: "[SUCESSO]", user: updatedUser });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Erro desconhecido.",
    });
  }
};

export const destroyUser = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    const result = await deleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Erro desconhecido.",
    });
  }
};
