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

  return (
    <div className="flex gap-4 flex-wrap text-white justify-center">
      {/* card 1 */}
      <div className="rounded bg-gray-900 px-4 py-2 w-52 flex gap-10 items-center">
        <div>
          <AiTwotoneLike size={50} color={"white"} />
          <div className="mt-2">
            <p className="">LIKES</p>
          </div>
        </div>
        <div>
          <p className="font-bold text-xl ">{likes}</p>
        </div>
      </div>
      {/* card 2 */}
      <div className="rounded bg-gray-900 px-4 py-2 w-52 flex gap-10 items-center">
        <div>
          <FaUserFriends size={50} color={"white"} />
          <div className="mt-2">
            <p className="">SUBS</p>
          </div>
        </div>
        <div>
          <p className="font-bold text-xl ">
            {appUser?.currentUser?.subscribers?.length}
          </p>
        </div>
      </div>
      {/* card 3 */}
      <div className="rounded bg-gray-900 px-4 py-2 w-52 flex gap-10 items-center">
        <div>
          <AiOutlineFieldTime size={50} color={"white"} />
          <div className="mt-2">
            <p className="">Total views</p>
          </div>
        </div>
        <div>
          <p className="font-bold text-xl ">{views}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStat;
