import React from "react";

const Notification = () => {
  return (
    <div className="flex gap-4 items-center cursor-pointer">
      <img
        src="/images/channel1.jpeg"
        alt="profile"
        className="rounded-full h-12 w-12"
      />
      <div className="flex flex-col">
        <p className="font-bold text-lg">username</p>
        <p className="font-thin text-sm">
          Houcine 7 have just uploaded a new video you can cheack it now{" "}
        </p>
      </div>
    </div>
  );
};

export default Notification;
