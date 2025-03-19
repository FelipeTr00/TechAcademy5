import { Request, Response } from "express";
import { findUserById } from "../service/UserService";

export async function getUserById(req: Request, res: Response) {
  const userId = (req as any).user.id;

  if (!userId) {
      return res.status(400).json({ message: "ID do usuário não encontrado no token." });
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



