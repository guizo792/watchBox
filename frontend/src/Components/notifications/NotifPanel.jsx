import React from "react";
import Fade from "react-reveal/Fade";
import { CiSquareRemove } from "react-icons/ci";
import Notification from "./Notification";
import { ReactComponent as NoNotifSvg } from "../../assets/notNotifs.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotificationPanel } from "../../store/notifications/notification.action";

// fake state

const NotifPanel = () => {
  const notification = useSelector((state) => state.notifications);

  const dispatch = useDispatch();

  console.log(notification);

  return (
    notification.showNotificationPanel && (
      <Fade right>
        <div className="fixed bg-gray-600 w-80 h-full top-16 right-0 px-3 py-4 z-50 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Notifactions</h1>
            <button
              className="cursor-pointer relative"
              onClick={() => dispatch(setShowNotificationPanel())}
            >
              <CiSquareRemove size={30} color={"white"} />
            </button>
          </div>
          <div className="h-full ">
            {notification.notificationsData === null ? (
              <div className="h-full flex flex-col justify-center">
                <NoNotifSvg />
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-8">
                {notification.notificationsData.map((notif, index) => {
                  return (
                    <Notification msg={notif.message} userId={notif.user} />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Fade>
    )
  );
};

export default NotifPanel;
