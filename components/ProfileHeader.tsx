import React from "react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  profileImage?: string; // optional URL for the profile picture
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, profileImage }) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${name} profile`}
            className="w-15 h-15 rounded-full object-cover"
          />
        ) : (
          <div className="w-15 h-15 rounded-full bg-gray-300 dark:bg-gray-700" />
        )}
        <div className="leading-tight">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
        </div>
      </div>
      <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"> 🔍 </button>
    </div>
  );
};

export default ProfileHeader;


// next: show a minimal way to convert your component to proper TSX with props so it’s fully typed and reusable.
// next2: show a version where the profile picture is dynamic too, keeping it fully typed