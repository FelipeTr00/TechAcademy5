import express from "express";
import sequelize from "./config/database";
import UserModel from "./model/UserModel";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await UserModel.findAll();
  res.json(users);
});

//sync database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});
