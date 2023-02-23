import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { setNotifications } from "../../store/notifications/notification.action";

var sock = new SockJS("http://localhost:8080/ws");
let stompClient = Stomp.over(sock);

sock.onopen = function () {
  console.log("open");
};

// function show(message) {
//   var response = document.getElementById("messages");
//   var p = document.createElement("p");
//   p.innerHTML = "message: " + message.message;
//   response.appendChild(p);
// }

const Notifications = () => {
  //

  const appUser = useSelector((state) => state.appUser);
  const dispatch = useDispatch();

  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);

    stompClient.subscribe("/topic/public", function (greeting) {
      console.log(JSON.parse(greeting.body));
    });

    stompClient.subscribe(
      "/notifications/" + appUser?.currentUser?.id,
      function (result) {
        // console.log(".....");
        // console.log(JSON.parse(result.body));
        dispatch(setNotifications([JSON.parse(result.body)]));
      }
    );
  });

  // const sendMessage = () => {
  //   stompClient.send(
  //     "/app/sendMessage",
  //     {},
  //     JSON.stringify({
  //       message: "hellow world",
  //     })
  //   );
  // };

  return;
};

export default Notifications;
