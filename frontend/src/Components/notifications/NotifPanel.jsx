import React, { useEffect } from "react";
import Fade from "react-reveal/Fade";
import { MdClose } from "react-icons/md";
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
        <aside
          aria-label="Notifications"
          className="fixed bottom-0 right-0 top-16 z-50 w-full max-w-sm border-l border-line bg-surface-raised px-4 py-4 shadow-card-hover"
        >
          <div className="flex items-center justify-between pb-4">
            <h1 className="text-lg font-bold">Notifications</h1>
            <button
              className="rounded-full p-1 text-muted hover:bg-surface-sunken hover:text-ink"
              aria-label="Close notifications"
              onClick={() => dispatch(setShowNotificationPanel())}
            >
              <MdClose size={22} />
            </button>
          </div>
          <div className="scrollbar-hide h-full overflow-y-auto pb-20">
            {notification?.notificationsData?.length === 0 ? (
              <div className="flex flex-col items-center gap-2 pt-6 text-center">
                <NoNotifSvg className="max-w-[12rem]" />
                <p className="text-sm text-muted">You're all caught up.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
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
        </aside>
      </Fade>
    )
  );
};

export default NotifPanel;
