import React from "react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  profileImageUrl?: string;
  fallbackInitials?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  profileImageUrl,
  fallbackInitials,
}) => {
  const initials =
    fallbackInitials ??
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0]?.toUpperCase())
      .join("");

  return (
    <div className="flex items-center gap-3 py-4 px-4 border-b border-gray-200 dark:border-gray-700">
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt={`${name} profile`}
          className="w-16 h-16 rounded-full border-2 border-(--foreground) dark:border-(--background) shadow-sm object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${name} avatar`}
          className="w-16 h-16 rounded-full border-2 border-(--foreground) dark:border-(--background) shadow-sm bg-(--sidebar-bg) text-(--sidebar-text) flex items-center justify-center text-base font-semibold"
        >
          {initials}
        </div>
      )}

      <div className="flex flex-col">
        <span className="font-semibold text-gray-900 dark:text-gray-100 text-md">
          {name}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {email}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;
