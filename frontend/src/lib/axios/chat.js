import { axiosInstance } from "./config";

const getStreamToken = async () => {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
};

export const apiChat = {
  getStreamToken,
};
