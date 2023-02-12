import axios from "axios";

axios.defaults.withCredentials = false;

const API_URL = process.env.REACT_APP_API_URL;

export const getAllVideos = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: API_URL + "videos",
    });
    // console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getVideo = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: API_URL + "videos/" + id,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const createVideo = async (videoDetails) => {
  try {
    const res = await axios({
      method: "POST",
      url: API_URL + "videos",
      data: videoDetails,
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
