"use client";

import { useAuth } from "./useAuth";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 px-3 py-2 bg-(--accent) text-white rounded-md hover:bg-(--accent-hover)"
    >
      <LogOut size={16} />
      Sign Out
    </button>
  );
}