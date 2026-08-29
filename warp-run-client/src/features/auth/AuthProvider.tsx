import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { authStore } from "../../api/authStore";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  useEffect(() => {
    authStore.setToken(token);
  }, [token]);

  useEffect(() => {
    authStore.setUnauthorizedHandler(logout);
  }, [logout]);

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