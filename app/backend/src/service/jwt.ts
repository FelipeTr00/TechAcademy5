import jwt from 'jsonwebtoken';
import User from '../model/UserModel';
import * as config from '../config';

const JWT_SECRET = config.JWT_SECRET || ""
const JWT_EXPIRES_IN = config.JWT_EXPIRES_IN || '1d'

export const generateToken = (user: User): string => {
    return jwt.sign({ id: user.id, email: user.email },
         JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
