import React, { useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import { Link } from "react-router-dom";

const resizeDesc = () => {};

const SearchResultsItem = ({
  thumbline,
  title,
  views,
  userId,
  desc,
  videoId,
}) => {
  //
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const user = await getUser(userId);
        if (isMounted) setUserInfo(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Link to={"/videos?id=" + videoId}>
      <div className="flex gap-4 mb-2 max-w-5xl">
        <img
          src={thumbline}
          alt="video-thubmbline"
          className="rounded-xl h-52 w-80"
        />
        <div className="">
          <h1 className="text-lg font-medium ">{title}</h1>
          <p className="text-sm font-semibold text-gray-700"> {views} views</p>
          <div className="flex pt-3 items-center gap-4">
            <img
              src={userInfo?.profilePicture || "/images/defaultProfile.jpg"}
              alt="profile"
              className="rounded-full w-10 h-10 "
            />
            <p className="font-semibold text-lg text-gray-600">
              {userInfo?.username}
            </p>
          </div>

          <p className="text-md pt-3 h-16 overflow-hidden ">{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsItem;
