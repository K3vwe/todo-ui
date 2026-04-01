"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import AuthModal from "./AuthModal";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  // Restore session from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData: User, token: string) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    }
    setModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const openLoginModal = useCallback(() => setModalOpen(true), []);
  const closeLoginModal = useCallback(() => setModalOpen(false), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
      {isModalOpen && <AuthModal isOpen={isModalOpen} onClose={closeLoginModal} />}
    </AuthContext.Provider>
  );
}