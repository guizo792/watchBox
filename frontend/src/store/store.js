import { configureStore } from "@reduxjs/toolkit";
import { commentsReducer } from "./comment/comment.reducer";
import { notificationReducer } from "./notifications/notification.reducer";
import { userReducer } from "./user/user.reducer";

// reducers
import { videoReducer } from "./video/video.reducer";
import { videosServicesReducer } from "./videosServices/videosServices.reducer";

export const store = configureStore({
  reducer: {
    videoToUploadDetails: videoReducer,
    appUser: userReducer,
    videosServices: videosServicesReducer,
    comment: commentsReducer,
    notifications: notificationReducer,
  },
});
