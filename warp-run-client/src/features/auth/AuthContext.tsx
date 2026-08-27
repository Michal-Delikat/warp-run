import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setupInterceptors } from "../../api/api.ts";

type AuthContextType = {
  token: string | null;
  login: (credentials: { username: string; password: string }) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  setupInterceptors(logout);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await axios.post("http://localhost:3000/login", credentials);
      return response.data.token as string;
    },
    onSuccess: (receivedToken) => {
      setToken(receivedToken);
      localStorage.setItem("token", receivedToken);
    },
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
