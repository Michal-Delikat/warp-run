import { createContext, useContext } from "react";

type AuthContextModel = {
  token: string | null;
  login: (credentials: { username: string; password: string }) => void;
  logout: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextModel | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
