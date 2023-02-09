const INITIAL_STATE = {
  videoDetails: null,
  isUploading: false,
  progressUploading: "0%",
  uploaded: false,
  errorUpload: null,
};

export const videoReducer = (state = INITIAL_STATE, action) => {
  //
  switch (action.type) {
    case "SET_VIDEO_DETAILS":
      return {
        ...state,
        videoDetails: { ...state.videoDetails, ...action.payload },
      };
    case "SET_IS_UPLOADING":
      return { ...state, isUploading: !state.isUploading };
    case "SET_PROGRESS":
      return { ...state, progressUploading: action.payload };
    case "SET_UPLOADED":
      return { ...state, uploaded: action.payload };
    default:
      return state;
  }
};
