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
