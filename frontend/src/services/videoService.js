import axios from "axios";
import {
  sendNotification,
  sendVideoUploadedNotification,
} from "./notifications";

import { AuthorizationHeader } from "./request.extras";

axios.defaults.withCredentials = false;

const API_BASE_URL = "http://localhost:8080/api/";

export const getAllVideos = async () => {
  try {
    //console.log("..");
    const res = await axios({
      method: "GET",
      url: API_BASE_URL + "videos",
      // headers: AuthorizationHeader(),
    });
    //console.log("reeeeeeeeeeees" + res);
    return res;
  } catch (err) {
    //console.log(err);
    throw new Error(err);
  }
};

export const getVideo = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: API_BASE_URL + "videos/" + id,
      // headers: AuthorizationHeader(),
    });
    // console.log(res);
    return res;
  } catch (err) {
    return err;
  }
};

//

export const ViewVideo = async (idVideo, viewsCount) => {
  try {
    const res = await axios.put(
      API_BASE_URL + "videos/" + idVideo,
      {
        viewsCount: parseInt(viewsCount),
      },
      { headers: AuthorizationHeader() }
    );
    return res.data;
  } catch (error) {
    throw new Error("Couldn't update views for this video");
  }
};

export const createVideo = async (videoDetails) => {
  try {
    // add new video
    const res = await axios({
      method: "POST",
      url: API_BASE_URL + "videos",
      data: videoDetails,
      headers: AuthorizationHeader(),
    });

    //notifiction to subscirebed users :
    sendVideoUploadedNotification(
      "just upladed new video :named " + videoDetails.title,
      videoDetails.userId
    );
    return res;
  } catch (err) {
    return err;
  }
};

// TODO : create video like Function
export const likeVideo = async (video, user) => {
  //
  try {
    let isDislikedVideo = false;

    user?.dislikedVideos?.forEach((item) => {
      if (item === video.id) {
        //
        isDislikedVideo = true;
        return true;
      }
    });

    if (isDislikedVideo) {
      //console.log("inside isDislikedVideo");

      await axios.put(
        API_BASE_URL + "videos/" + video.id,
        {
          dislikes: video.dislikes - 1,
        },
        { headers: AuthorizationHeader() }
      );
    }

    //console.log("after isDislikedVideo");
    const resUser = await axios.put(
      API_BASE_URL + "users/" + user.id,
      {
        likedVideos: [video.id],
      },
      { headers: AuthorizationHeader() }
    );

    const resVideo = await axios.put(
      API_BASE_URL + "videos/" + video.id,
      {
        likes: video.likes + 1,
      },
      { headers: AuthorizationHeader() }
    );

    sendNotification(
      "just liked your video titled: " + video.title,
      resVideo.data.userId,
      user.id
    );
    return { userAfterLike: resUser.data, videoAfterLike: resVideo.data };
  } catch (error) {
    const resUser = await axios.delete(
      API_BASE_URL + "users/likedVideos/" + user.id,
      {
        data: {
          idVideo: video.id,
        },
        headers: AuthorizationHeader(),
      }
    );
    //console.log(resUser);
    const resVideo = await axios.put(
      API_BASE_URL + "videos/" + video.id,
      {
        likes: video.likes - 1,
      },
      { headers: AuthorizationHeader() }
    );

    return { userAfterLike: resUser.data, videoAfterLike: resVideo.data };
  }
};

//
export const dislikeVideo = async (video, user) => {
  //

  try {
    let isLikedViedo = false;

    user?.likedVideos?.forEach((item) => {
      if (item === video.id) {
        //
        isLikedViedo = true;
        return true;
      }
    });

    //console.log(isLikedViedo);
    if (isLikedViedo) {
      const res = await axios.put(
        API_BASE_URL + "videos/" + video.id,
        {
          likes: video.likes - 1,
        },
        { headers: AuthorizationHeader() }
      );

      //console.log(res);
    }

    const resUser = await axios.put(
      API_BASE_URL + "users/" + user.id,
      {
        dislikedVideos: [video.id],
      },
      { headers: AuthorizationHeader() }
    );

    const resVideo = await axios.put(
      API_BASE_URL + "videos/" + video.id,
      {
        dislikes: video.dislikes + 1,
      },
      { headers: AuthorizationHeader() }
    );
    return { userAfterDislike: resUser.data, videoAfterDislike: resVideo.data };
  } catch (error) {
    const resUser = await axios.delete(
      API_BASE_URL + "users/dislikedVideos/" + user.id,
      {
        data: {
          idVideo: video.id,
        },
        headers: AuthorizationHeader(),
      }
    );
    //console.log(resUser.data);

    const resVideo = await axios.put(
      API_BASE_URL + "videos/" + video.id,
      {
        dislikes: video.dislikes - 1,
      },
      { headers: AuthorizationHeader() }
    );
    //console.log(resVideo.data);

    return { userAfterDislike: resUser.data, videoAfterDislike: resVideo.data };
  }
};
