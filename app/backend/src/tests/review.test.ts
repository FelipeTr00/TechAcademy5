import request from "supertest";
import "dotenv/config";

const API_URL = process.env.API_URL || "http://localhost:8080";
const loginEndpoint = "/login";
const reviewEndpoint = "/reviews";

// Usuário de teste já existente no banco
const testUser = {
  email: "test@email.com",
  passwd: "passwd"
};

const getToken = async () => {
  const res = await request(API_URL).post(loginEndpoint).send(testUser);
  return res.body.token;
};

const testCases = async () => {
  const token = await getToken();

  return [
    {
      title: "Criar review com token válido",
      payload: {
        title: "Review 5 estrelas",
        content: "Excelente experiência!",
        rating: 5,
      },
      expectedStatus: 201,
      auth: true,
    },
    {
      title: "Criar review sem token",
      payload: {
        title: "Review sem token",
        content: "Sem autorização.",
        rating: 4,
      },
      expectedStatus: 401,
      auth: false,
    },
    {
      title: "Rating inválido (string)",
      payload: {
        title: "Rating bugado",
        content: "Enviei string em vez de número",
        rating: "cinco",
      },
      expectedStatus: 400,
      auth: true,
    },
    {
      title: "Campos obrigatórios faltando",
      payload: {
        content: "Sem título e rating",
      },
      expectedStatus: 400,
      auth: true,
    },
  ].map((test) => ({
    ...test,
    token,
  }));
};

const run = async () => {
  const tests = await testCases();

  for (const test of tests) {
    const fullUrl = `${API_URL}${reviewEndpoint}`;
    console.log(`\n[TEST] ${test.title}`);
    console.log(`[INFO] POST ${fullUrl}`);

    try {
      const req = request(API_URL).post(reviewEndpoint).send(test.payload);

      if (test.auth) {
        req.set("Authorization", `Bearer ${test.token}`);
      }

      const res = await req;

      if (res.status === test.expectedStatus) {
        console.log(`[OK] Status ${res.status} as expected`);
      } else {
        console.log(`[FAIL] Expected ${test.expectedStatus}, got ${res.status}`);
        console.log("Body:", res.body);
      }
    } catch (err: any) {
      console.log("[ERROR] Exception:", err.message);
      console.error("[DETAIL]", err);
    }
  }
};

run();
