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
      //console.log(state.notificationsData);
      return {
        ...state,
        notificationsData: [...action.payload],
        newNotificationReceived: action.payload.length === 0 ? false : true,
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
