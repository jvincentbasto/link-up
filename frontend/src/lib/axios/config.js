import axios from "axios";

const API_URL = import.meta.env.API_URL ?? "http://localhost:8000/api";
const BASE_URL = import.meta.env.MODE === "development" ? API_URL : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
