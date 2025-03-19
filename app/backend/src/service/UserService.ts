import { Request, Response } from "express"
import User from "../model/UserModel";
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';

export const findUserById = async (id: number) => {
    return await User.findByPk(id);
};

export const getAll = async (req: Request, res: Response) => {}


export const createUser = async (req: Request, res: Response) => {};


export const updateUser = async (
  req: Request<{ id: string }>, 
  res: Response) => {};

  export const deleteUserById = async (
    req: Request<{ id: string }>, 
    res: Response) => {}


