import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

// user friends
const getRecommendedUsers = async (req, res) => {
  try {
    const currentUser = req.user;
    const currentUserId = req.user.id;

    const payload = {
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, // exclude current user's friends
        { isOnboarded: true },
      ],
    };
    const recommendedUsers = await User.find(payload).select("-password");

    res.status(200).json(recommendedUsers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get recommended users" });
  }
};
const getUserFriends = async (req, res) => {
  try {
    const fields = "fullName profilePic location";
    const user = await User.findById(req.user.id)
      .select("-password")
      .select("friends")
      .populate("friends", fields);

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user's friends" });
  }
};
const unfriend = async (req, res) => {
  try {
    const currentId = req.user.id;
    const { id: friendId } = req.params; // this should be the ID of the friend to unfriend

    // Make sure the friend exists
    const friend = await User.findById(friendId).select("-password");
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Remove each other from friends list
    await User.findByIdAndUpdate(currentId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: currentId } });

    res.status(200).json({ message: "Successfully unfriended" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unfriend user" });
  }
};

// friend requests
const sendFriendRequest = async (req, res) => {
  try {
    const currentId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent friend req to personal account
    if (currentId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to your account" });
    }

    const recipient = await User.findById(recipientId).select("-password");
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if user is already friends
    if (recipient.friends.includes(currentId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // check if a req already exists
    const payloadExisting = {
      $or: [
        { sender: currentId, recipient: recipientId },
        { sender: recipientId, recipient: currentId },
      ],
    };
    const existingRequest = await FriendRequest.findOne(payloadExisting);

    if (existingRequest) {
      return res.status(400).json({
        message: "Friend request already exists",
      });
    }

    const payload = { sender: currentId, recipient: recipientId };
    const friendRequest = await FriendRequest.create(payload);

    res.status(201).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: "Failed to send friend request" });
  }
};
const acceptFriendRequest = async (req, res) => {
  try {
    const currentId = req.user.id;
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Verify the current user is the recipient
    if (friendRequest.recipient.toString() !== currentId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // update friend list
    const payloadSender = {
      $addToSet: { friends: friendRequest.recipient },
    };
    const payloadRecipient = {
      $addToSet: { friends: friendRequest.sender },
    };
    await User.findByIdAndUpdate(friendRequest.sender, payloadSender);
    await User.findByIdAndUpdate(friendRequest.recipient, payloadRecipient);

    // delete friend request
    await friendRequest.deleteOne();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to accept friend request" });
  }
};
const cancelFriendRequest = async (req, res) => {
  try {
    const currentId = req.user.id;
    const { id: requestId } = req.params; // this should be the ID of the friend request

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Only the sender can cancel their own request
    if (friendRequest.sender.toString() !== currentId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel this request" });
    }

    // Only pending requests can be canceled
    if (friendRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending requests can be canceled" });
    }

    await friendRequest.deleteOne();

    res.status(200).json({ message: "Friend request canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel friend request" });
  }
};
const getFriendRequests = async (req, res) => {
  // users who requested friend requests

  try {
    const payloadIncoming = { recipient: req.user.id, status: "pending" };
    const fieldsIncoming = "fullName profilePic location";
    const incoming = await FriendRequest.find(payloadIncoming).populate(
      "sender",
      fieldsIncoming
    );

    const payloadAccepted = { sender: req.user.id, status: "accepted" };
    const fieldsAccepted = "fullName profilePic location";
    const accepted = await FriendRequest.find(payloadAccepted).populate(
      "recipient",
      fieldsAccepted
    );

    res.status(200).json({ incoming, accepted });
  } catch (error) {
    res.status(500).json({ message: "Failed to get user's friend requests" });
  }
};
const getOutgoingFriendRequest = async (req, res) => {
  // your sent friend requests

  try {
    const payload = { sender: req.user.id, status: "pending" };
    const fields = "fullName profilePic location";
    const outgoingRequests = await FriendRequest.find(payload).populate(
      "recipient",
      fields
    );

    res.status(200).json(outgoingRequests);
  } catch (error) {
    res.status(500).json({ message: "Failed to get outgoing friend requests" });
  }
};

export const userController = {
  getUserFriends,
  getRecommendedUsers,
  unfriend,
  //
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  getFriendRequests,
  getOutgoingFriendRequest,
};
