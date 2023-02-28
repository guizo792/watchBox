const INITIAL_STATE = {
  searchKey: null,
  searchKeyResult: [],
  showSuggetions: false,
};

export const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SEARCH_KEY":
      return { ...state, searchKey: action.payload };

    case "SET_SEARCH_KEY_RESULT":
      return {
        ...state,
        searchKeyResult: [...action.payload],
      };
    case "SET_SHOW_SUGGESTIONS":
      return {
        ...state,
        showSuggetions: action.payload,
      };
    default:
      return state;
  }
};
