import React from "react";
import { useSelector } from "react-redux";
import ButtonMain from "../Constants/ButtonMain";

const ImageProfile = () => {
  const appUser = useSelector((state) => state.appUser);
  const user = appUser?.currentUser;
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div className="panel flex h-full flex-col items-center gap-3 px-4 py-6 text-center">
      <img
        src={user?.profilePicture || "/images/defaultProfile.jpg"}
        alt="Your profile"
        className="h-28 w-28 rounded-full bg-surface-sunken object-cover shadow-card ring-4 ring-brand-soft"
      />
      <div>
        <p className="text-lg font-bold">{fullName}</p>
        <p className="text-sm text-muted">{user?.username && "@" + user.username}</p>
      </div>
      <ButtonMain name="Change photo" upload={true} />
    </div>
  );
};

export default ImageProfile;
