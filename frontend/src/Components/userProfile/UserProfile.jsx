import React from "react";
import GeneralDetails from "./GeneralDetails";
import ImageProfile from "./ImageProfile";
import ProfileStat from "./ProfileStat";

const UserProfile = () => {
  return (
    <section className="max-w-6xl mx-auto mt-10">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <ImageProfile />
        </div>
        <div className="col-span-3 bg-gray-800 rounded-md">
          <GeneralDetails />
        </div>
      </div>
      <div className="mt-10">
        <ProfileStat />
      </div>
    </section>
  );
};

export default UserProfile;
