"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MainWorkspace from "@/components/main/MainWorkspace";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Protected from "@/components/auth/Protected";

export default function AppShell() {
  const [activeCategory, setActiveCategory] = useState("Tasks");

  return (
    <AuthProvider>
      <div className="h-screen w-screen bg-(--background) text-(--foreground)">
    <div className="grid grid-cols-12 h-full">
      {/* Sidebar: fixed width ~3/12 */}
      <Sidebar
        className="col-span-3 bg-(--sidebar-bg) border-r border-(--secondary)/30"
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Workspace: remaining 9/12 */}
      <Protected>
        <MainWorkspace
          className="col-span-9 overflow-auto p-4"
          activeCategory={activeCategory}
        />
      </Protected>
      
    </div>
      </div>
    </AuthProvider>
    
  );
}
