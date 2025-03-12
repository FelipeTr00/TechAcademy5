import { Router } from "express";
import { getUserByIdController } from "./controller/UserController";

const router = Router();

router.get("/id/:id", getUserByIdController);

export default router;
