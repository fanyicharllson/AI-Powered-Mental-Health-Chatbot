import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastlogin: string;
  __v: number;
}

interface AuthStore {
  user: User | null;
  email: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  signup: (username: string, email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  resentVericationCode: (email: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}

axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  email: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });
      set({
        user: response.data.user,
        email: response.data.newUser?.email,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Error signing up! Please try again.",
        isLoading: false,
      });
      throw error;
    }
  },

  signin: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Error signing in! Please try again.",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Error Verfiying email!",
        isLoading: false,
      });
      throw error;
    }
  },
  resentVericationCode: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/resend-verifcationCode`, {
        email,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Error Resending Verfication code!",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      throw error;
    }
  },
}));
