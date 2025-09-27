import { StreamChat } from "stream-chat";
import { config } from "./config.js";

const { streamApiKey, streamApiSecret } = config.envs;

if (!streamApiKey || !streamApiSecret) {
  console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(streamApiKey, streamApiSecret);

const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};
const generateStreamToken = (userId) => {
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
export const stream = {
  upsertStreamUser,
  generateStreamToken,
};
