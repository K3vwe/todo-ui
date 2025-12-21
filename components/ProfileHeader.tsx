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
  const initials = fallbackInitials || name.split(" ").map(n => n[0]).join("");

  return (
    <div className="flex items-center gap-3 py-4 px-4 border-b border-gray-200 dark:border-gray-700">
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt={`${name} profile`}
          className="w-15 h-15 rounded-full border-2 border-white/50 dark:border-gray-600/50 shadow-sm object-cover"
        />
      ) : (
        <div className="w-15 h-15 rounded-full border-2 border-white/50 dark:border-gray-600/50 shadow-sm bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
          {initials}
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900 dark:text-gray-100 text-md">{name}</span>
        <span className="text-sm text-gray-600 dark:text-gray-300">{email}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
