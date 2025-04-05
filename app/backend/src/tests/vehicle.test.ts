import request from "supertest";
import "dotenv/config";

const API_URL = process.env.API_URL || "http://localhost:8080";

const testCases = [
  {
    title: "Buscar veículos por tipo e ano (válido)",
    method: "post",
    endpoint: "/get-vehicles",
    payload: {
      Tipo: "motos",
      anoModelo: 2020,
    },
    expectedStatus: 200,
  },
  {
    title: "Buscar veículos por tipo e ano (filtros ausentes)",
    method: "post",
    endpoint: "/get-vehicles",
    payload: {}, // nada enviado
    expectedStatus: 400,
  },
  {
    title: "Buscar veículo por FIPE (válido)",
    method: "get",
    endpoint: "/get-vehicle",
    query: { CodigoFipe: "811013-1" },
    expectedStatus: 200,
  },
  {
    title: "Buscar veículo por FIPE (sem parâmetro)",
    method: "get",
    endpoint: "/get-vehicle",
    query: {},
    expectedStatus: 400,
  },
  {
    title: "Buscar veículo por FIPE (inexistente)",
    method: "get",
    endpoint: "/get-vehicle",
    query: { CodigoFipe: "000000-0" },
    expectedStatus: 404,
  },
];

const run = async () => {
  for (const test of testCases) {
    console.log(`\n[TEST] ${test.title}`);
    const url = `${API_URL}${test.endpoint}`;
    console.log(`[INFO] ${test.method.toUpperCase()} ${url}`);

    try {
      let res;
      if (test.method === "post") {
        res = await request(API_URL).post(test.endpoint).send(test.payload);
      } else {
        res = await request(API_URL).get(test.endpoint).query(test.query);
      }

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
