"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyUser = exports.patchUser = exports.updateUser = exports.createUser = exports.getMe = void 0;
exports.getUserById = getUserById;
const UserService_1 = require("../service/UserService");
const UserRepository_1 = require("../repository/UserRepository");
async function getUserById(req, res) {
    const userId = req.user.id;
    if (!userId) {
        return res
            .status(400)
            .json({ message: "ID do usuário não encontrado no token." });
    }
    try {
        const user = await (0, UserService_1.findUserById)(Number(userId));
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuário" });
    }
}
;
const getMe = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }
    try {
        const user = await (0, UserService_1.whoAmI)(userId);
        res.status(200).json({ user });
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: error instanceof Error ? error.message : "Erro desconhecido1.",
        });
    }
};
exports.getMe = getMe;
const createUser = async (req, res) => {
    const { name, email, passwd, passwdCheck, cpf, access } = req.body;
    if (!name || !email || !passwd || !passwdCheck || !cpf || !access) {
        return res.status(400).json({ message: "Preencha todos os campos." });
    }
    if (passwd !== passwdCheck) {
        return res.status(400).json({ message: "Senhas diferentes." });
    }
    const passwdLevel = (0, UserRepository_1.getPasswordStrength)(passwd);
    if (passwdLevel === "fraca") {
        return res.status(400).json({ message: "Senha muito fraca. Use letras, números e símbolos." });
    }
    if (!(0, UserRepository_1.isValidCPF)(cpf)) {
        return res.status(400).json({ message: "CPF inválido." });
    }
    try {
        const newUser = await (0, UserService_1.insertUser)({ name, email, passwd: passwd, cpf, access });
        res.status(201).json({ message: "[SUCESSO]", user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "[ERRO] ao criar usuário." });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const userId = req.user.id;
    const updateData = req.body;
    if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }
    try {
        const updatedUser = await (0, UserService_1.alterUser)(userId, updateData);
        res.status(200).json({ message: "[SUCESSO]", user: updatedUser });
    }
    catch (error) {
        const errMessage = error instanceof Error ? error.message : "Erro desconhecido2.";
        res.status(500).json({ message: errMessage });
    }
};
exports.updateUser = updateUser;
const patchUser = async (req, res) => {
    const userId = req.user.id;
    const updateData = req.body;
    if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }
    try {
        const updatedUser = await (0, UserService_1.alterUser)(userId, updateData);
        res.status(200).json({ message: "[SUCESSO]", user: updatedUser });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Erro desconhecido3.",
        });
    }
};
exports.patchUser = patchUser;
const destroyUser = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }
    try {
        const result = await (0, UserService_1.deleteUser)(userId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Erro desconhecido4.",
        });
    }
};
exports.destroyUser = destroyUser;
