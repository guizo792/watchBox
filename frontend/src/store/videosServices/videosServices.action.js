// Fetching all videos
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

// Fetching specific video
export const fetchVideoStart = () => {
  return { type: "FETCH_VIDEO_START" };
};

export const fetchVideoSuccess = (video) => {
  return {
    type: "FETCH_VIDEO_SUCCESS",
    payload: video,
  };
};

export const fetchVideoFailure = (error) => {
  return {
    type: "FETCH_VIDEO_FAILURE",
    payload: error,
  };
};
