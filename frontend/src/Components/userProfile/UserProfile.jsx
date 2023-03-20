import React, { Fragment, useEffect, useState } from "react";
import GeneralDetails from "./GeneralDetails";
import ImageProfile from "./ImageProfile";
import ProfileStat from "./ProfileStat";
import { ReactComponent as Svg } from "../../assets/blob.svg";
import { ReactComponent as Wave } from "../../assets/wave.svg";
import { getUserVideos } from "../../services/userService";
import { useSelector } from "react-redux";
import VideoComponent from "../video/Video";
const UserProfile = () => {
  const appUser = useSelector((state) => state.appUser);

  const [userVideos, setuserVideos] = useState([]);

  useEffect(() => {
    const ftechuserVideos = async () => {
      //
      try {
        const userVideos = await getUserVideos(appUser?.currentUser?.id);

        setuserVideos(userVideos);
      } catch (error) {
        //
        console.log("error: " + error);
      }
    };

    ftechuserVideos();

    // return () => {
    //   second
    // }
  }, []);

  return (
    <section className="max-w-6xl mx-auto mt-4 sm:mt-10 overflow-hidden">
      <div className="sm:grid sm:grid-cols-4 sm:gap-6">
        <div className="col-span-1">
          <ImageProfile />
        </div>
        <div className="col-span-3 bg-gray-800 rounded-b-md sm:rounded-md">
          <GeneralDetails />
        </div>
      </div>
      <div className="mt-10">
        <ProfileStat />
      </div>

      <div className="mt-8 mb-5">
        <h1 className="pt-2 text-xl font-bold">My videos</h1>
        <span className="block w-8 border-2 border-main"></span>

        <div className="flex gap-2 flex-wrap mt-4 mb-2 justify-center">
          {userVideos.map((video) => (
            <VideoComponent video={video} key={video.id} />
          ))}
        </div>
      </div>
      <div className="absolute top-0 -z-30" style={{ left: "-9rem" }}>
        <Svg className="w-80 h-60" />
      </div>
      <div
        className="absolute top-2 -z-30 overflow-hidden"
        style={{ right: "-5rem" }}
      >
        <Svg className="w-80 h-60" />
      </div>
    </section>
  );
};

export default UserProfile;
