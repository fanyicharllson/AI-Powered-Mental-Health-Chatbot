import axios from "axios";

// Creating an instance for authentication API

const authApi = axios.create({
  baseURL: process.env.FRONTEND_API_BASE_URL || "http://localhost:3000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;
