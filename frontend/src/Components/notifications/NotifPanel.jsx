import React, { useEffect } from "react";
import Fade from "react-reveal/Fade";
import { CiSquareRemove } from "react-icons/ci";
import Notification from "./Notification";
import { ReactComponent as NoNotifSvg } from "../../assets/notNotifs.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotifications,
  setShowNotificationPanel,
} from "../../store/notifications/notification.action";
import axios from "axios";

// fake state

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

      console.log(response);
      dispatch(setNotifications(response?.data));
    };
    fetchNotification();
  }, [appUser?.currentUser?.id]);

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
            {notification?.notificationsData?.length === 0 ? (
              <div className="h-full flex flex-col justify-center">
                <NoNotifSvg />
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-8 overflow-y-scroll">
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
