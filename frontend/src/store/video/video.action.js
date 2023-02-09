export const savVideoDetails = (videoDetails) => {
  return {
    type: "SET_VIDEO_DETAILS",
    payload: videoDetails,
  };
};

export const setVideoUploading = () => {
  return {
    type: "SET_IS_UPLOADING",
  };
};

export const setUploadingProgress = (progress) => {
  return {
    type: "SET_PROGRESS",
    payload: progress + "%",
  };
};

export const setUploaded = (isUploaded) => {
  return {
    type: "SET_UPLOADED",
    payload: isUploaded,
  };
};
