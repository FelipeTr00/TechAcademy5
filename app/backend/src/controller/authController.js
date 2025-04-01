"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config = __importStar(require("../config"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const JWT_SECRET = config.JWT_SECRET || "";
const JWT_EXPIRES_IN = "30d";
async function login(req, res) {
    const { email, passwd } = req.body;
    try {
        const user = await UserModel_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "[ERRO] Usuário não encontrado." });
        }
        const isPasswordValid = await bcrypt_1.default.compare(passwd, user.passwd);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "[ERRO] Usuário ou Senha incorretos" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            access: user.access,
        }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return res.status(200).json({
            token,
            userId: user.id,
            userName: user.name,
        });
    }
    catch (error) {
        console.error("[ERRO] Falha no login:", error);
        return res.status(500).json({ message: "[ERRO] Falha de autenticação." });
    }
}
