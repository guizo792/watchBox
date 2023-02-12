const INITIAL_STATE = {
  currentUser: null,
  isLoggedIn: false,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  //
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: !state.isLoggedIn };

    case "SET_USER_LOGGED_IN":
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
      };
    default:
      return state;
  }
};
