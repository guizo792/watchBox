import React, { useEffect, useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";

import { FaUserFriends } from "react-icons/fa";

import { AiOutlineFieldTime } from "react-icons/ai";
import { getUserVideos } from "../../services/userService";
import { useSelector } from "react-redux";

//
const ProfileStat = () => {
  //
  const appUser = useSelector((state) => state.appUser);

  // const [userVideos, setUserVideos] = useState([]);
  const [likes, setlikes] = useState(0);
  const [views, setviews] = useState(0);

  useEffect(() => {
    const ftechLikes = async () => {
      //
      try {
        const data = await getUserVideos(appUser?.currentUser?.id);

        let counterLikes = 0;
        let counterViews = 0;
        data.forEach((video) => {
          counterLikes += video?.likes;
          if (video?.viewsCount !== null && video?.viewsCount !== undefined)
            counterViews += video?.viewsCount;
        });
        setlikes(counterLikes);

        setviews(counterViews);
      } catch (error) {
        //
        console.log("error: " + error);
      }
    };

    ftechLikes();

    // return () => {
    //   second
    // }
  }, []);

  const stats = [
    { label: "Likes", value: likes, Icon: AiTwotoneLike },
    {
      label: "Subscribers",
      value: appUser?.currentUser?.subscribers?.length ?? 0,
      Icon: FaUserFriends,
    },
    { label: "Total views", value: views, Icon: AiOutlineFieldTime },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, Icon }) => (
        <div key={label} className="panel flex items-center gap-4 p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
            <Icon size={26} />
          </span>
          <div>
            <p className="text-2xl font-bold leading-none">{value}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStat;
