"use client";

import Sidebar from "./Sidebar";
import MainWorkspace from "@/components/main/MainWorkspace";

export default function AppShell() {
  return (
    <div className="h-screen w-screen transition-colors duration-300 bg-(--background) text-(--foreground)">
      <div className="grid grid-cols-12 h-full">
        <Sidebar />
        <MainWorkspace />
      </div>
    </div>
  );
}
