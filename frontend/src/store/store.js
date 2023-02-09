import { configureStore } from "@reduxjs/toolkit";

// reducers
import { videoReducer } from "./video/video.reducer";

export const store = configureStore({
  reducer: {
    videoToUploadDetails: videoReducer,
  },
});
