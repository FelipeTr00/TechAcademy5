"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PORT = exports.DB_HOST = exports.DB_PASSWD = exports.DB_USER = exports.DATABASE = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET || "";
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "";
exports.DATABASE = process.env.DATABASE || "";
exports.DB_USER = process.env.DB_USER || "";
exports.DB_PASSWD = process.env.DB_PASSWD || "";
exports.DB_HOST = process.env.DB_HOST || "";
exports.DB_PORT = Number(process.env.DB_PORT) || 0;
const database = new sequelize_1.Sequelize(exports.DATABASE, exports.DB_USER, exports.DB_PASSWD, {
    host: exports.DB_HOST,
    port: exports.DB_PORT,
    dialect: "mysql",
    logging: false,
});
(async () => {
    try {
        await database.authenticate();
        console.log("Conexão estabelecida com sucesso!");
        await database.sync({ alter: true });
        console.log("Tabelas sincronizadas!");
    }
    catch (error) {
        console.error("Erro na sincronização ou conexão com o banco:", error);
    }
})();
exports.default = database;
