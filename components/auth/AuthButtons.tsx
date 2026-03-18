"use client";

import { useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "./useAuth";
import AuthModal from "./AuthModal";

interface Props {
  SidebarItem: any; // your SidebarItem component
}

export default function AuthButtons({ SidebarItem }: Props) {
  const { isAuthenticated, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  // -------------------------------
  // User is logged in → Logout button
  // -------------------------------
  if (isAuthenticated) {
    return (
      <SidebarItem
        label="Logout"
        icon={<LogOut size={16} />}
        onClick={logout}
        className={`
          flex items-center gap-2 font-medium 
          hover:bg-(--accent)/30 rounded-md transition-colors
        `}
      />
    );
  }

  // -------------------------------
  // User is logged out → Sign In / Sign Up
  // -------------------------------
  return (
    <>
      <SidebarItem
        label="Sign In / Sign Up"
        icon={<LogIn size={16} />}
        onClick={() => setModalOpen(true)}
        className={`
          flex items-center gap-2 font-medium 
          hover:bg-(--accent)/30 rounded-md transition-colors
        `}
      />
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}