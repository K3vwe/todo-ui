"use client";

import { useState } from "react";
import { useAuth } from "./useAuth";
import AuthInput from "./AuthInput";

interface SignupFormProps {
  closeModal?: () => void;
}

export default function SignupForm({ closeModal }: SignupFormProps) {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((res) => setTimeout(res, 500));
      const newUser = { id: "2", name, username, email };
      const fakeToken = "fake-jwt-token";

      login(newUser, fakeToken);
      if (closeModal) closeModal();
    } catch {
      setError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-(--foreground)">Sign Up</h2>

      <AuthInput
        label="Name"
        value={name}
        onChange={setName}
        placeholder="John Doe"
        required
      />

      <AuthInput
        label="Username"
        type="text"
        value={username}
        onChange={setUsername}
        placeholder="username"
        required
      />

      <AuthInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        required
      />

      <AuthInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
        required
      />

      {error && <span className="text-sm text-red-500">{error}</span>}

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={closeModal}
          className="rounded-md bg-(--secondary) px-4 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-(--primary) px-4 py-2 text-white"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
}