import axios from "axios";

axios.defaults.withCredentials = false;

const API_BASE_URL = "http://localhost:8080/api/";

export const getAllVideos = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: API_BASE_URL + "videos",
    });
    // console.log(res);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const getVideo = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: API_BASE_URL + "videos/" + id,
    });
    // console.log(res);
    return res;
  } catch (err) {
    return err;
  }
};

export const createVideo = async (videoDetails) => {
  try {
    const res = await axios({
      method: "POST",
      url: API_BASE_URL + "videos",
      data: videoDetails,
    });
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
      await axios.put(API_BASE_URL + "videos/" + video.id, {
        dislikes: video.dislikes - 1,
      });
    }
    const resUser = await axios.put(API_BASE_URL + "users/" + user.id, {
      likedVideos: [video.id],
    });

    const resVideo = await axios.put(API_BASE_URL + "videos/" + video.id, {
      likes: video.likes + 1,
    });

    return { userAfterLike: resUser.data, videoAfterLike: resVideo.data };
  } catch (error) {
    const resUser = await axios.delete(
      API_BASE_URL + "users/likedVideos/" + user.id,
      {
        data: {
          idVideo: video.id,
        },
      }
    );
    console.log(resUser);
    const resVideo = await axios.put(API_BASE_URL + "videos/" + video.id, {
      likes: video.likes - 1,
    });

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
      const res = await axios.put(API_BASE_URL + "videos/" + video.id, {
        likes: video.likes - 1,
      });

      //console.log(res);
    }

    const resUser = await axios.put(API_BASE_URL + "users/" + user.id, {
      dislikedVideos: [video.id],
    });

    const resVideo = await axios.put(API_BASE_URL + "videos/" + video.id, {
      dislikes: video.dislikes + 1,
    });

    return { userAfterDislike: resUser.data, videoAfterDislike: resVideo.data };
  } catch (error) {
    const resUser = await axios.delete(
      API_BASE_URL + "users/dislikedVideos/" + user.id,
      {
        data: {
          idVideo: video.id,
        },
      }
    );
    console.log(resUser.data);

    const resVideo = await axios.put(API_BASE_URL + "videos/" + video.id, {
      dislikes: video.dislikes - 1,
    });
    console.log(resVideo.data);

    return { userAfterDislike: resUser.data, videoAfterDislike: resVideo.data };
  }
};
