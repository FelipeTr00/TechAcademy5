import { Sequelize } from "sequelize";

const database = new Sequelize("db", "root", "root", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
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