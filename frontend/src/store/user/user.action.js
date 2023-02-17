export const setIsLoggedIn = () => {
  return {
    type: "SET_IS_LOGGED_IN",
  };
};

export const setUser = (userDetails) => {
  localStorage.setItem("user", JSON.stringify(userDetails));
  return {
    type: "SET_USER_LOGGED_IN",
    payload: userDetails,
  };
};
