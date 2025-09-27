import { stream } from "../lib/stream.js";

const { generateStreamToken } = stream;

const getStreamToken = async (req, res) => {
  try {
    const token = generateStreamToken(req.user.id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Failed to get stream token" });
  }
};

export const chatController = {
  getStreamToken,
};
