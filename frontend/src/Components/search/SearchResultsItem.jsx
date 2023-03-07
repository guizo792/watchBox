import React, { useEffect, useState } from "react";
import { getUser } from "../../services/userService";

const SearchResultsItem = ({ thumbline, title, views, userId, desc }) => {
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
    <div className="flex gap-4 mb-2">
      <img
        src={thumbline}
        alt="video-thubmbline"
        className="rounded-2xl h-56 w-96"
      />
      <div className="">
        <h1 className="text-2xl font-bold pt-2">{title}</h1>
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

        <p className="text-lg pt-3">{desc}</p>
      </div>
    </div>
  );
};

export default SearchResultsItem;
