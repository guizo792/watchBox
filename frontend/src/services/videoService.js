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
    return err;
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
