"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MainWorkspace from "@/components/main/MainWorkspace";
import { AuthProvider } from "../auth/AuthProvider";

export default function AppShell() {
  const [activeCategory, setActiveCategory] = useState("Tasks");

  return (
    <AuthProvider>
      <div className="h-screen w-screen bg-(--background) text-(--foreground)">
      <div className="grid grid-cols-12 h-full">
        <Sidebar
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <MainWorkspace activeCategory={activeCategory} />
      </div>
    </div>
    </AuthProvider>
    
  );
}
