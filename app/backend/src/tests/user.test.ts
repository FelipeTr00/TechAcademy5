import request from "supertest";
import "dotenv/config";

const API_URL = process.env.API_URL || "http://localhost:8080";
const endpoint = "/new-user";

const testCases = [
  {
    title: "CPF inválido",
    payload: {
      cpf: "12345678900",
      email: "user1@email.com",
      passwd: "SenhaForte123!",
      name: "Usuário Teste",
    },
    expectedStatus: 400,
  },
  {
    title: "Senha fraca",
    payload: {
      cpf: "00581361008", 
      email: "user2@email.com",
      passwd: "123",
      name: "Usuário Teste",
    },
    expectedStatus: 400,
  },
  {
    title: "Criação com sucesso",
    payload: {
        name: "Test",
        email: "test2@email.com",
        passwd: "senha123",
        passwdCheck: "senha123",
        cpf: "00581361008",
        access: "admin"
      },
    expectedStatus: 201,
  },
];

const run = async () => {
  for (const test of testCases) {
    console.log(`\n[TEST] ${test.title}`);
    console.log(`[INFO] POST ${API_URL}${endpoint}`);

    try {
      const res = await request(API_URL).post(endpoint).send(test.payload);

      if (res.status === test.expectedStatus) {
        console.log(`[OK] Status ${res.status} as expected`);
      } else {
        console.log(`[FAIL] Expected ${test.expectedStatus}, return ${res.status}`);
        console.log("Body:", res.body);
      }
    } catch (err: any) {
        console.log(`[ERROR] Exception: ${err.message}`);
        console.error("[DETAIL]", err);
      }
  }
};

run();
