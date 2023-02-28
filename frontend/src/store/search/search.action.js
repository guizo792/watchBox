export const setSearchKey = (key) => {
  //
  return {
    type: "SET_SEARCH_KEY",
    payload: key,
  };
};

export const setSearchKeyResults = (keySearchResult) => {
  //
  //console.log(keySearchResult);
  return {
    type: "SET_SEARCH_KEY_RESULT",
    payload: keySearchResult,
  };
};

export const setSuggetions = (show) => {
  //
  return {
    type: "SET_SHOW_SUGGESTIONS",
    payload: show,
  };
};
