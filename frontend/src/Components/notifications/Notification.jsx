import React, { useEffect, useState } from "react";

import { getUser } from "../../services/userService";
import Avatar from "../Avatar/Avatar";

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

  const [day, time] = (date || "").split("T");
  const when = day ? `${day} at ${(time || "").slice(0, 5)}` : "";

  return (
    <div className="flex items-start gap-3">
      <Avatar
        src={user?.profilePicture}
        name={user?.username}
        className="h-10 w-10 text-sm"
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold">{user?.username}</p>
        <p className="text-sm text-muted">{msg}</p>
        <p className="mt-1 text-xs text-muted">{when}</p>
      </div>
    </div>
  );
};

export default Notification;
