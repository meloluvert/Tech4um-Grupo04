"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/lib/api/auth";

type User = {
  username: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);   
    }

    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const response = await authApi.login({ email, password, role: "USER" });

    const newToken = response.data.token;
    setToken(newToken);

    const userData: User = {
      username: response.data.username,
      email: response.data.email,
    };

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  }

  async function register(username: string, email: string, password: string) {
    await authApi.register({ username, email, password, role: "USER" });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");           
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
