// Protected.tsx
"use client";

import { useAuth } from "./useAuth";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading, openLoginModal } = useAuth();

  if (loading) {
    return (
      <div className="col-span-9 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-(--primary) mx-auto"></div>
          <p className="mt-2 text-(--foreground)/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="col-span-9 flex h-full flex-col items-center justify-center text-center text-(--secondary)">
        <div className="text-3xl mb-3">🔐</div>
        
        <p className="text-sm font-medium text-(--foreground)">
          You're not signed in
        </p>
        
        <p className="text-xs mt-1 max-w-xs text-(--secondary)">
          Sign in to access your workspace and start managing your tasks
        </p>
        
        <button
          onClick={openLoginModal}
          className="mt-6 rounded-md bg-(--primary) px-4 py-2 text-white text-sm hover:bg-(--primary)/90 transition-colors"
        >
          Sign In / Sign Up
        </button>
      </div>
    );
  }

  return <>{children}</>;
} 