// Fetching all comments
export const fetchCommentsStart = () => {
  return { type: "FETCH_COMMENTS_START" };
};

export const fetchCommentsSuccess = (comments) => {
  return {
    type: "FETCH_COMMENT_SUCCESS",
    payload: comments,
  };
};

export const fetchCommentsFailure = (error) => {
  return {
    type: "FETCH_COMMENTS_FAILURE",
    payload: error,
  };
};

// Fetching specific comment
export const fetchCommentStart = () => {
  return { type: "FETCH_COMMENT_START" };
};

export const fetchCommentSuccess = (comment) => {
  return {
    type: "FETCH_COMMENT_SUCCESS",
    payload: comment,
  };
};

export const fetchCommentFailure = (error) => {
  return {
    type: "FETCH_COMMENT_FAILURE",
    payload: error,
  };
};
