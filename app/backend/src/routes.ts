import { Router } from "express";
import { login } from "./controller/authController";
import { getUserById } from "./controller/UserController";
import { authenticateToken } from "./middleware/authMiddleware";

const router = Router();

router.post("/login", login);
router.post("/get-user", authenticateToken, getUserById);

export default router;
