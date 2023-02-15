import React from "react";
import { useSelector } from "react-redux";
import ButtonMain from "../Constants/ButtonMain";

const ImageProfile = () => {
  const appUser = useSelector((state) => state.appUser);
  return (
    <div className="bg-gray-800 rounded-md py-3 px-4 flex flex-col items-center text-white">
      <img
        src={appUser?.currentUser?.profilePicture}
        alt="profile"
        className="h-32 rounded-lg shadow-lg"
      />
      <div className="mt-2 flex flex-col items-center">
        <p className="text-lg font-bold">
          {appUser?.currentUser?.firstName +
            " " +
            appUser?.currentUser?.lastName}
        </p>
        <p className="text-sm font-normal">
          {"@" + appUser?.currentUser?.username}
        </p>
      </div>
      <div className="mt-4">
        <ButtonMain name="change profile pic" icon="" />
      </div>
    </div>
  );
};

export default ImageProfile;
