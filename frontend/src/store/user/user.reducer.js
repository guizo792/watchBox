const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  isLoggedIn: JSON.parse(localStorage.getItem("user")) === null ? false : true,
};

console.log(INITIAL_STATE);

export const userReducer = (state = INITIAL_STATE, action) => {
  //
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: !state.isLoggedIn };

    case "SET_USER_LOGGED_IN":
      return {
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
