import React, { Fragment, useEffect, useState } from "react";
import GeneralDetails from "./GeneralDetails";
import ImageProfile from "./ImageProfile";
import ProfileStat from "./ProfileStat";
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
    <section className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <div className="grid gap-6 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <ImageProfile />
        </div>
        <div className="sm:col-span-3">
          <GeneralDetails />
        </div>
      </div>
      <div className="mt-6">
        <ProfileStat />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">My videos</h2>
        <span className="mt-1 block h-0.5 w-10 rounded bg-brand"></span>

        {userVideos.length === 0 ? (
          <p className="mt-6 text-sm text-muted">
            You haven't uploaded any videos yet.
          </p>
        ) : (
          <div className="video-grid mt-6">
            {userVideos.map((video) => (
              <VideoComponent video={video} key={video.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
