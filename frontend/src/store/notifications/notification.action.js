export const setShowNotificationPanel = () => {
  return {
    type: "SET_SHOW_NOTIFICATION",
  };
};

export const setNotifications = (data) => {
  //
  return {
    type: "SET_NOTIFICATIONS",
    payload: data,
  };
};

export const setNotification = (data) => {
  //
  return {
    type: "ADD_NEW_NOTIFICATION",
    payload: data,
  };
};
