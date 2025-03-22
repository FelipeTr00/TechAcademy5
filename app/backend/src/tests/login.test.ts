import bcrypt from "bcrypt";

const novaSenha = "123";

bcrypt.hash(novaSenha, 10).then(hash => {
  console.log("Novo hash para '123':", hash);
  console.log("$2b$10$a4msgMNKt1EKoawSoDJ1d.64tM3zyprHkKe.IIm73PwUAKrRRoxbS");
});
