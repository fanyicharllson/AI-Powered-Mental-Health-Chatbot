import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

interface AuthStore {
  user: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  signup: (username: string, email: string, password: string) => Promise<void>;
}

axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: true,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (username: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
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
        error: axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
}));
