"use client";

import { useState, useRef } from "react";

export default function MainWorkspace() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <main className="col-span-12 md:col-span-9 h-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* Sticky header */}
      <div
        className={`
          sticky top-0 z-20 h-14 flex items-center px-6
          border-b border-gray-200 dark:border-gray-700
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
          transition-shadow
          ${isScrolled ? "shadow-sm" : ""}
        `}
      >
        <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          All Tasks
        </h1>
      </div>

      {/* Scrollable task area */}
      <div
        ref={scrollRef}
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
        className="flex-1 overflow-y-auto px-6 py-4"
      >
        <div className="space-y-3">
          {/* Placeholder tasks */}
        </div>
      </div>

    </main>
  );
}
