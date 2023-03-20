import React from "react";
import { useSelector } from "react-redux";
import ButtonMain from "../Constants/ButtonMain";

const ImageProfile = () => {
  const appUser = useSelector((state) => state.appUser);
  return (
    <div className="bg-gray-800 rounded-t-lg sm:rounded-md py-3 gap-4 px-4 flex sm:flex-col items-center text-white">
      <div>
        <img
          src={appUser?.currentUser?.profilePicture}
          alt="profile"
          className=" h-40 sm:h-32 rounded-lg  shadow-lg"
        />
        <div className="sm:hidden mt-2">
          <p className="text-lg font-bold">
            {appUser?.currentUser?.firstName +
              " " +
              appUser?.currentUser?.lastName}
          </p>
          <p className="text-sm font-normal">
            {"@" + appUser?.currentUser?.username}
          </p>
        </div>
      </div>

      <div className="hidden sm:mt-2 sm:flex sm:flex-col sm:items-center">
        <p className="text-lg font-bold">
          {appUser?.currentUser?.firstName +
            " " +
            appUser?.currentUser?.lastName}
        </p>
        <p className="text-sm font-normal">
          {"@" + appUser?.currentUser?.username}
        </p>
      </div>
      <div className=" sm:mt-4">
        <ButtonMain name="change profile pic" icon="" upload={true} />
      </div>
    </div>
  );
};

export default ImageProfile;
