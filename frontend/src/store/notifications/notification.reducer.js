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
        notificationsData: [...state.notificationsData, ...action.payload],
        newNotificationReceived: true,
      };
    default:
      return state;
  }
};
