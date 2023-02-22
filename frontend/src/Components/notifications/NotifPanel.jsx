import React from "react";
import Fade from "react-reveal/Fade";
import { IoNotificationsSharp } from "react-icons/io5";
import Notification from "./Notification";
import { ReactComponent as NoNotifSvg } from "../../assets/notNotifs.svg";

// fake state

const NoData = true;

const NotifPanel = () => {
  return (
    <Fade right>
      <div className="fixed bg-gray-600 w-80 h-full top-16 right-0 px-3 py-4 z-50 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Notifactions</h1>
          <IoNotificationsSharp size={30} color={"white"} />
        </div>
        <div className="h-full ">
          {NoData ? (
            <div className="h-full flex flex-col justify-center">
              <NoNotifSvg />
            </div>
          ) : (
            <div className="flex flex-col gap-6 mt-8">
              <Notification />
              <Notification />
              <Notification />
              <Notification />
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default NotifPanel;
