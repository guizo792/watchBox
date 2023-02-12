export const fetchVideosStart = () => {
  return { type: "FETCH_VIDEOS_START" };
};

export const fetchVideosSuccess = (videos) => {
  return {
    type: "FETCH_VIDEOS_SUCCESS",
    payload: videos,
  };
};

export const fetchVideosFailure = (error) => {
  return {
    type: "FETCH_VIDEOS_FAILURE",
    payload: error,
  };
};
