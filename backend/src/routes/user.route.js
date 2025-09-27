import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { userController } from "../controllers/user.controller.js";

const {
  // friends
  getRecommendedUsers,
  getUserFriends,
  unfriend,
  // friend requests
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  getFriendRequests,
  getOutgoingFriendRequest,
} = userController;

const router = express.Router();

// apply auth middleware to all routes
router.use(protectRoute);

// friends
router.get("/", getRecommendedUsers);
router.get("/friends", getUserFriends);
router.delete("/unfriend/:id", unfriend);

// friend requests
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.delete("/friend-request/:id", cancelFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.get("/friend-requests/outgoing", getOutgoingFriendRequest);

export default router;
