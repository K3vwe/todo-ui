"use client";

import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-(--background) p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {mode === "login" ? (
          <>
            <LoginForm closeModal={onClose} />
            <p className="mt-4 text-center text-sm text-(--foreground)">
              Don’t have an account?{" "}
              <button
                className="text-(--primary) font-semibold hover:underline"
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignupForm closeModal={onClose} />
            <p className="mt-4 text-center text-sm text-(--foreground)">
              Already have an account?{" "}
              <button
                className="text-(--primary) font-semibold hover:underline"
                onClick={() => setMode("login")}
              >
                Sign In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}