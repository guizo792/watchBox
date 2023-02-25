import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

var sock = new SockJS("http://localhost:8080/ws");

export let stompClient = Stomp.over(sock);

sock.onopen = function () {
  console.log("open");
};

export const sendNotification = (message, userToNotify, userEmitter) => {
  stompClient.send(
    "/app/sendNotification",
    {},
    JSON.stringify({
      message: message,
      userToNotify: userToNotify,
      userEmitter: userEmitter,
    })
  );
};

export const sendVideoUploadedNotification = (message, userEmitter) => {
  stompClient.send(
    "/app/newVideo",
    {},
    JSON.stringify({
      message: message,
      userEmitter: userEmitter,
    })
  );
};

export const getUserNotifications = async (idUser) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/notifications/" + idUser
    );
    return response.data;
  } catch (error) {
    throw new Error("error while getting notification");
  }
};
