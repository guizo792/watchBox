import axios from "axios";
import { AuthorizationHeader } from "./request.extras";

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
    // user informations
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

    // user toekn
    localStorage.setItem("token", data.jwtToken);

    return response.data;
  } catch (error) {
    //
    //console.log(error);
    throw new Error("Bad request");
  }
};

// sign in
export const login = async (user) => {
  //
  //console.log(user);
  try {
    const response = await axios.post(API_BASE_URL + "login", user);
    const data = response.data;
    //console.log(data);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        profilePicture: data.profilePicture,
      })
    );

    localStorage.setItem("token", data.jwtToken);

    return data;
  } catch (error) {
    //
    //console.log(error);
    throw new Error("Bad request");
  }
};

// update users data

export const updateUser = async (idUser, user) => {
  //
  try {
    const response = await axios.put(API_BASE_URL_USERS + idUser, user, {
      headers: AuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error("couldn't update user: ");
  }
};

// Get user data by id
export const getUser = async (idUser) => {
  try {
    const response = await axios.get(API_BASE_URL_USERS + idUser);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserVideos = async (idUser) => {
  //get user's videos

  try {
    const response = await axios.get(API_BASE_URL_USERS + idUser + "/videos");
    return response.data;
  } catch (error) {
    throw new Error("Error while getting user's videos");
  }
};

//
// change password for

export const changeUserPassword = async (
  idUser,
  currentPassword,
  newPassword
) => {
  try {
    const response = await axios.put(
      API_BASE_URL_USERS + idUser + "/password",
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
      { headers: AuthorizationHeader() }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error while changing password");
  }
};
