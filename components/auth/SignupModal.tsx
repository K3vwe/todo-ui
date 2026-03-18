"use client";

import SignupForm from "./SignupForm";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // click outside closes modal
    >
      <div
        className="w-full max-w-md rounded-xl bg-(--background) p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
      >
        <SignupForm closeModal={onClose} />
      </div>
    </div>
  );
}