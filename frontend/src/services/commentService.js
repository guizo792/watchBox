import axios from "axios";

axios.defaults.withCredentials = false;

const API_BASE_URL = "http://localhost:8080/api/";

export const getAllComments = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: API_BASE_URL + "comments",
    });
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
};

export const createComment = async (commentDetails) => {
  try {
    const res = await axios({
      method: "POST",
      url: API_BASE_URL + "comments",
      data: commentDetails,
    });
    return res;
  } catch (err) {
    return err;
  }
};
