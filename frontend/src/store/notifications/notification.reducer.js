const INITIAL_STATE = {
  showNotificationPanel: false,
  notificationsData: [],
  newNotificationReceived: false,
};

export const notificationReducer = (state = INITIAL_STATE, action) => {
  //*
  switch (action.type) {
    case "SET_SHOW_NOTIFICATION":
      return {
        ...state,
        showNotificationPanel: !state.showNotificationPanel,
        newNotificationReceived: false,
      };
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notificationsData: [...action.payload],
        newNotificationReceived: true,
      };
    case "SET_NOTIFICATIONS_NO_NEW_NOTIFICATIONS":
      return {
        ...state,
        notificationsData: [...action.payload],
        newNotificationReceived: false,
      };
    case "ADD_NEW_NOTIFICATION":
      //console.log("new notification received");
      return {
        ...state,
        notificationsData: [...action.payload, ...state.notificationsData],
        newNotificationReceived: true,
      };
    default:
      return state;
  }
};
