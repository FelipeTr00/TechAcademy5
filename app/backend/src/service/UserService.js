"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoAmI = exports.deleteUser = exports.alterUser = exports.updateUser = exports.getAll = exports.insertUser = exports.findUserById = void 0;
const UserModel_1 = require("../model/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const findUserById = async (id) => {
    return await UserModel_1.User.findByPk(id);
};
exports.findUserById = findUserById;
const insertUser = async ({ name, email, passwd, cpf, access, }) => {
    try {
        const newUser = await UserModel_1.User.create({
            name,
            email,
            passwd,
            cpf,
            access,
        });
        return newUser;
    }
    catch (error) {
        throw new Error("[ERRO] Falha ao criar usuário.");
    }
};
exports.insertUser = insertUser;
const getAll = async (req, res) => { };
exports.getAll = getAll;
const updateUser = async (req, res) => { };
exports.updateUser = updateUser;
const alterUser = async (id, updateData) => {
    try {
        const user = await UserModel_1.User.findByPk(id);
        if (!user) {
            throw new Error("Usuário ou senha inválidos.");
        }
        if (updateData.passwd) {
            updateData.passwd = await bcrypt_1.default.hash(updateData.passwd, 10);
        }
        await user.update(updateData);
        return user;
    }
    catch (error) {
        throw new Error("Erro ao atualizar usuário.");
    }
};
exports.alterUser = alterUser;
const deleteUser = async (id) => {
    try {
        const user = await UserModel_1.User.findByPk(id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        await user.destroy();
        return { message: "Usuário excluído com sucesso." };
    }
    catch (error) {
        throw new Error("Erro ao excluir usuário.");
    }
};
exports.deleteUser = deleteUser;
const whoAmI = async (id) => {
    try {
        const user = await UserModel_1.User.findByPk(id, {
            attributes: ["id", "name", "email", "access", "createdAt", "updatedAt"],
        });
        if (!user) {
            throw new Error("Usuário ou senha inválidos.");
        }
        return user;
    }
    catch (error) {
        throw new Error("Erro ao buscar usuário.");
    }
};
exports.whoAmI = whoAmI;
