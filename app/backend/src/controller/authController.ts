import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as config from "../config";
import User from "../model/UserModel";

const JWT_SECRET = config.JWT_SECRET || "";
const JWT_EXPIRES_IN = "30d"; 

export async function login(req: Request, res: Response) {
  const { email, passwd } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "[ERRO] Usuário não encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(passwd, user.passwd);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "[ERRO] Usuário ou Senha incorretos" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        access: user.access,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      token,
      userId: user.id,
      userName: user.name,
    });
  } catch (error) {
    console.error("[ERRO] Falha no login:", error);
    return res.status(500).json({ message: "[ERRO] Falha de autenticação." });
  }
}

