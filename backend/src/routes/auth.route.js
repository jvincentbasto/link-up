import express from "express";
import { userController } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
const { signup, login, logout, onboarding, verifyUser } = userController;

// main
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//
router.post("/onboarding", protectRoute, onboarding);
router.get("/me", protectRoute, verifyUser);

export default router;
