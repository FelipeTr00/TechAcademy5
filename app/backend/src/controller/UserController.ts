import { Request, Response } from "express";
import {
  findUserById,
  insertUser,
  alterUser,
  deleteUser,
  whoAmI
} from "../service/UserService";
import {  isValidCPF,
          PasswordStrength,
          getPasswordStrength } from '../repository/UserRepository'
import { User } from '../model/UserModel'

      
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
};


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
        message: error instanceof Error ? error.message : "Erro desconhecido1.",
      });
  }
};


export const createUser = async (req: Request, res: Response) => {
  const { name, email, passwd, passwdCheck, cpf, access } = req.body;

  if (!name || !email || !passwd || !passwdCheck || !cpf || !access) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  if (passwd !== passwdCheck) {
    return res.status(400).json({ message: "Senhas diferentes." });
  }

  const passwdLevel = getPasswordStrength(passwd);
  if (passwdLevel === "fraca") {
    return res.status(400).json({ message: "Senha muito fraca. Use letras, números e símbolos." });
  }

  if (!isValidCPF(cpf)) {
    return res.status(400).json({ message: "CPF inválido." });
  }

  try {
    const newUser = await insertUser({ name, email, passwd: passwd, cpf, access });
    res.status(201).json({ message: "[SUCESSO]", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "[ERRO] ao criar usuário." });
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
      error instanceof Error ? error.message : "Erro desconhecido2.";
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
      message: error instanceof Error ? error.message : "Erro desconhecido3.",
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
      message: error instanceof Error ? error.message : "Erro desconhecido4.",
    });
  }
};
