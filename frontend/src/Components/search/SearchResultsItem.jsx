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
    <Link to={"/videos?id=" + videoId} className="group block">
      <div className="flex max-w-5xl flex-col gap-4 sm:flex-row">
        <img
          src={thumbline}
          alt=""
          className="aspect-video w-full shrink-0 rounded-xl bg-surface-sunken object-cover shadow-card transition-shadow group-hover:shadow-card-hover sm:w-72"
        />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold leading-snug group-hover:text-brand">
            {title}
          </h2>
          <p className="text-sm text-muted"> {views} views</p>
          <div className="flex items-center gap-3 pt-3">
            <img
              src={userInfo?.profilePicture || "/images/defaultProfile.jpg"}
              alt=""
              className="h-8 w-8 rounded-full bg-surface-sunken object-cover"
            />
            <p className="text-sm font-semibold text-muted">
              {userInfo?.username}
            </p>
          </div>

          <p className="line-clamp-2-fallback pt-3 text-sm text-muted">{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsItem;
