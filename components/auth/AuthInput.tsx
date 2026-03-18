"use client";

interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: AuthInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-(--foreground)">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-md border border-(--secondary) bg-(--secondary) p-2"
      />
    </div>
  );
}