"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import AuthModal from "./AuthModal";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Restore session
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setModalOpen(false); // close modal on login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const openLoginModal = () => setModalOpen(true);
  const closeLoginModal = () => setModalOpen(false);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, openLoginModal, closeLoginModal }}
    >
      {children}
      <AuthModal isOpen={isModalOpen} onClose={closeLoginModal} />
    </AuthContext.Provider>
  );
}