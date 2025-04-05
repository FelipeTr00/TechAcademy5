import request from "supertest";
import "dotenv/config"

const API_URL = process.env.API_URL || "http://localhost:8080";

const run = async () => {
  const endpoint = "/login";
  const fullUrl = `${API_URL}${endpoint}`;

  console.log(`[INFO] POST ${fullUrl}`); // 🔍 Log da URL real

  try {
    const res = await request(API_URL).post(endpoint).send({
      email: "test@email.com",
      passwd: "passwd",
    });

    if (res.status === 200 && res.body.token) {
      console.log("[OK] Login passed!");
      console.log("Token:", res.body.token);
    } else {
      console.log("[ERROR] Login failed!");
      console.log("Status:", res.status);
      console.log("Body:", res.body);
    }
  } catch (err: any) {
    console.log("[ERROR] Login failed!");
    console.error("Exception:", err.message);
  }
};

run();
