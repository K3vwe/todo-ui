"use client";

import { useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "./useAuth";
import AuthModal from "./AuthModal";

interface Props {
  SidebarItem: any;
}

export default function AuthButtons({ SidebarItem }: Props) {
  const { isAuthenticated, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (isAuthenticated) {
    return (
      <SidebarItem
        label="Logout"
        icon={<LogOut size={20} />}
        onClick={logout}
      />
    );
  }

  return (
    <>
      <SidebarItem
        label="Sign In / Sign Up"
        icon={<LogIn size={20} />}
        onClick={() => setModalOpen(true)}
      />
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}