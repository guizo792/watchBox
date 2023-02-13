const INITIAL_STATE = {
  isFetching: false,
  comments: [],
  comment: {},
  errorFetching: null,
};

export const commentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_COMMENTS_STARTED":
      return { ...state, isFetching: true };
    case "FETCH_COMMENTS_SUCCESS":
      return { ...state, comments: action.payload, isFetching: false };
    case "FETCH_COMMENTS_FAILURE":
      return { ...state, error: action.payload, isFetching: false };
    case "FETCH_COMMENT_STARTED":
      return { ...state, isFetching: true };
    case "FETCH_COMMENT_SUCCESS":
      return { ...state, comment: action.payload, isFetching: false };
    case "FETCH_COMMENT_FAILURE":
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
};
