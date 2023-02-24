import { json } from "react-router";
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
