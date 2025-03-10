import { Sequelize } from "sequelize";

const sequelize = new Sequelize("biblioteca", "root", "arkad", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
