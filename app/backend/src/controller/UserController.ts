import { Request, Response } from "express";
import { getUserById } from "../service/UserService";

export async function getUserByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
};