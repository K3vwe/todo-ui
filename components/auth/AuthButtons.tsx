"use client";

import { useState, useRef, useEffect } from "react";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "./useAuth";
import AuthModal from "./AuthModal";

interface Props {
  SidebarItem: any;
}

export default function AuthButtons({ SidebarItem }: Props) {
  const { isAuthenticated, logout, user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Logged in → show user avatar + name + dropdown
  if (isAuthenticated && user) {
    return (
      <div className="relative" ref={menuRef}>
        <SidebarItem
          label={
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-(--primary) text-xs font-bold text-white">
                {getInitials(user.name)}
              </div>
              <span>{user.name}</span>
            </div>
          }
          onClick={() => setMenuOpen((prev) => !prev)}
          className="font-medium hover:bg-(--secondary) rounded-md transition-colors"
        />
        <div
          className={`absolute left-0 mt-2 w-40 rounded-md bg-(--background) shadow-lg z-50 overflow-hidden transition-all duration-200 ease-out
            ${menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-(--secondary) rounded-md"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Logged out → show one combined Sign In / Sign Up button
  return (
    <>
      <SidebarItem
        label="Sign In / Sign Up"
        icon={<LogIn size={20} />}
        onClick={() => setModalOpen(true)}
        className="font-medium hover:bg-(--secondary) rounded-md transition-colors"
      />
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}