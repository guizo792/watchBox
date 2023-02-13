import axios from "axios";

axios.defaults.withCredentials = false;

const API_BASE_URL = "http://localhost:8080/api/";

export const getAllVideos = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: API_BASE_URL + "comments",
    });
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
