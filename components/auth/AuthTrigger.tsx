"use client";

import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "./useAuth";

export default function AuthTrigger({ SidebarItem }: any) {
  const { isAuthenticated, logout, openLoginModal } = useAuth();

  if (isAuthenticated) {
    return (
      <SidebarItem
        label="Logout"
        icon={<LogOut size={16} />}
        onClick={logout}
      />
    );
  }

  return (
    <SidebarItem
      label="Sign In / Sign Up"
      icon={<LogIn size={16} />}
      onClick={openLoginModal}
    />
  );
}