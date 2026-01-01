"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SettingsSectionProps {
  label: string;
  children: React.ReactNode;
}

export default function SettingsSection({ label, children }: SettingsSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md bg-(--sidebar-bg) mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium focus:outline-none"
      >
        <span>{label}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <div
        className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 border-t border-(--secondary)">
          {children}
        </div>
      </div>
    </div>
  );
}
