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
export const likeVideo = async (idVideo, idUser, likesNumber) => {
  try {
    const resUser = await axios.put(API_BASE_URL + "users/" + idUser, {
      likedVideos: [idVideo],
    });

    const resVideo = await axios.put(API_BASE_URL + "videos/" + idVideo, {
      likes: likesNumber,
    });

    return { resUser, resVideo };
  } catch (error) {
    throw new Error("user already liked this video");
  }
};
