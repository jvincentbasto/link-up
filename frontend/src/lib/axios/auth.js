import { axiosInstance } from "./config";

// main
const signup = async (payload) => {
  const response = await axiosInstance.post("/auth/signup", payload);
  return response.data;
};
const login = async (payload) => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};
const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    return null;
  }
};

//
const onBoarding = async (payload) => {
  const response = await axiosInstance.post("/auth/onboarding", payload);
  return response.data;
};

export const apiAuth = {
  signup,
  login,
  logout,
  getAuthUser,
  //
  onBoarding,
};
