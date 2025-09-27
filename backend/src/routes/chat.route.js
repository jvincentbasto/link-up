import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { chatController } from "../controllers/chat.controller.js";

const router = express.Router();
const { getStreamToken } = chatController;

//
router.get("/token", protectRoute, getStreamToken);

export default router;
