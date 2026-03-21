"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "./useAuth";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading, openLoginModal } = useAuth();
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!loading && !user && !hasOpened.current) {
      openLoginModal();
      hasOpened.current = true;
    }
  }, [loading, user, openLoginModal]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return <>{children}</>;
}