import { useEffect } from "react";
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setupInterceptors } from "../../api/api.ts";

type AuthContextModel = {
  token: string | null;
  login: (credentials: { username: string; password: string }) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextModel | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  useEffect(() => {
    setupInterceptors(logout);
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await axios.post("http://localhost:3000/login", credentials);
      return response.data.token as string;
    },
    onSuccess: (receivedToken) => {
      setToken(receivedToken);
      localStorage.setItem("token", receivedToken);
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return (
    <AuthContext.Provider value={{ token, login: loginMutation.mutate, logout, isLoading: loginMutation.isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
