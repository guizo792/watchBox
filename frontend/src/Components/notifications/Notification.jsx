import React, { useEffect, useState } from "react";

import { getUser } from "../../services/userService";

const Notification = ({ msg, userId, date }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(userId);
      //console.log(data);
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <div className="flex gap-4 items-center cursor-pointer">
      <img
        src={user?.profilePicture}
        alt="profile"
        className="rounded-full h-12 w-12"
      />
      <div className="flex flex-col">
        <p className="font-bold text-lg">{user?.username}</p>
        <p className="font-thin text-sm">{msg} </p>
        <p className="font-semibold text-xs mt-1">
          {date?.split("T")[0] +
            "  at " +
            date?.split("T")[1]?.split(":")[0] +
            ":" +
            date?.split("T")[1]?.split(":")[1]}
        </p>
      </div>
    </div>
  );
};

export default Notification;
