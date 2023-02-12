import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.reducer";

// reducers
import { videoReducer } from "./video/video.reducer";

export const store = configureStore({
  reducer: {
    videoToUploadDetails: videoReducer,
    appUser: userReducer,
  },
});
