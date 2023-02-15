import axios from "axios";

const API_BASE_URL = "http://localhost:8080/auth/";
const API_BASE_URL_USERS = "http://localhost:8080/api/users/";

// registe a new user account
export const register = async (newUser) => {
  //
  try {
    const response = await axios.post(API_BASE_URL + "register", {
      ...newUser,
    });

    const data = response.data;
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: data.username,
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        profilePicture: data.profilePicture,
      })
    );

    return response.data;
  } catch (error) {
    //
    console.log(error);
    throw new Error("Bad request");
  }
};

// sign in
export const login = async (user) => {
  //
  console.log(user);
  try {
    const response = await axios.post(API_BASE_URL + "login", user);
    const data = response.data;
    console.log(data);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        id: data.id,
        profilePicture: data.profilePicture,
      })
    );

    return data;
  } catch (error) {
    //
    console.log(error);
    throw new Error("Bad request");
  }
};

// update users data

export const updateUser = async (idUser, user) => {
  //
  try {
    const response = await axios.put(API_BASE_URL_USERS + idUser, user);
    return response.data;
  } catch (error) {
    throw new Error("couldn't update user: ");
  }
};
