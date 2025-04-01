"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const novaSenha = "123";
bcrypt_1.default.hash(novaSenha, 10).then(hash => {
    console.log("Novo hash para '123':", hash);
    console.log("$2b$10$a4msgMNKt1EKoawSoDJ1d.64tM3zyprHkKe.IIm73PwUAKrRRoxbS");
});
