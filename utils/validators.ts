// utils/validators.ts
export interface SignupData {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

// returns field-level errors
export function validateSignupFields(data: SignupData) {
  const errors: Partial<Record<keyof SignupData, string>> = {};

  if (!/^[A-Za-z\s]{2,}$/.test(data.fullname)) {
    errors.fullname = "Full name must be at least 2 letters";
  }

  if (!/^[a-zA-Z0-9_]{3,20}$/.test(data.username)) {
    errors.username =
      "Username must be 3–20 chars, letters, numbers, or underscores";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(data.password)) {
    errors.password =
      "Password must be 8+ chars with uppercase, lowercase, and number";
  }

  return errors;
}