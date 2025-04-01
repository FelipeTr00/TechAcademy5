"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./repository/swagger");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.API_PORT || "";
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, swagger_1.setupSwagger)(app);
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}/`);
    console.log(`Swagger: http://localhost:${PORT}/docs`);
});
