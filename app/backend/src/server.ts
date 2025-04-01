import express from "express";
import cors from "cors";
import router from "./routes";
import { setupSwagger } from "./repository/swagger";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || ""

app.use(express.json());
app.use(cors());

setupSwagger(app);
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}/`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});