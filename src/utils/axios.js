import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "https://coll-app-server.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export default customFetch;
