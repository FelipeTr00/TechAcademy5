import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || ""
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || ""
export const DATABASE = process.env.DATABASE || ""
export const DB_USER = process.env.DB_USER || ""
export const DB_PASSWD = process.env.DB_PASSWD || ""
export const DB_HOST = process.env.DB_HOST || ""
export const DB_PORT = Number(process.env.DB_PORT) || 0

const database = new Sequelize(DATABASE, DB_USER, DB_PASSWD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await database.authenticate();
    console.log("Conexão estabelecida com sucesso!");

    await database.sync({ alter: true });
    console.log("Tabelas sincronizadas!");
  } catch (error) {
    console.error("Erro na sincronização ou conexão com o banco:", error);
  }
})();

export default database;