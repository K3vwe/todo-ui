"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MainWorkspace from "@/components/main/MainWorkspace";

export default function AppShell() {
  const [activeCategory, setActiveCategory] = useState("Tasks");

  return (
    <div className="h-screen w-screen bg-(--background) text-(--foreground)">
      <div className="grid grid-cols-12 h-full">
        <Sidebar
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <MainWorkspace activeCategory={activeCategory} />
      </div>
    </div>
  );
}
