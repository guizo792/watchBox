import React, { useEffect } from "react";
import Fade from "react-reveal/Fade";
import { CiSquareRemove } from "react-icons/ci";
import Notification from "./Notification";
import { ReactComponent as NoNotifSvg } from "../../assets/notNotifs.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotifications,
  setNotificationsNoNew,
  setShowNotificationPanel,
} from "../../store/notifications/notification.action";
import axios from "axios";

// fake state

const prevNotifications =
  JSON.parse(localStorage.getItem("notifications")) || null;

const NotifPanel = () => {
  const notification = useSelector((state) => state.notifications);
  const appUser = useSelector((state) => state.appUser);
  const dispatch = useDispatch();

  useEffect(() => {
    //
    const fetchNotification = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/notifications/" + appUser?.currentUser?.id
      );

      // no notifications recieved or notifications array changed
      if (
        prevNotifications === null ||
        prevNotifications.length !== response?.data.length
      ) {
        //
        localStorage.setItem("notifications", JSON.stringify(response?.data));
        dispatch(setNotifications(response?.data));
      } else {
        //setNotifications state but no new
        dispatch(setNotificationsNoNew(response?.data));
      }
    };
    fetchNotification();
  }, [appUser?.currentUser?.id]);

  return (
    notification.showNotificationPanel && (
      <Fade right>
        <div className="fixed bg-gray-600 w-80 bottom-0 top-16 right-0 px-3 py-4 z-50 text-white">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-xl font-bold">Notifactions</h1>
            <button
              className="cursor-pointer relative"
              onClick={() => dispatch(setShowNotificationPanel())}
            >
              <CiSquareRemove size={30} color={"white"} />
            </button>
          </div>
          <div className="h-full overflow-scroll scrollbar-hide">
            {notification?.notificationsData?.length === 0 ? (
              <div className="flex flex-col justify-center">
                <NoNotifSvg />
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-4 mb-8 ">
                {notification.notificationsData.map((notif, index) => {
                  return (
                    <Notification
                      key={index}
                      msg={notif.message}
                      userId={notif.idSender}
                      date={notif.date}
                    />
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
