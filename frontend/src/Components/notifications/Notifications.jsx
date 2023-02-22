import SockJS from "sockjs-client";
import Stomp from "stompjs";

var sock = new SockJS("http://localhost:8080/ws");
let stompClient = Stomp.over(sock);

sock.onopen = function () {
  console.log("open");
};

stompClient.connect({}, function (frame) {
  console.log("Connected: " + frame);

  stompClient.subscribe("/topic/public", function (greeting) {
    console.log(JSON.parse(greeting.body));
  });

  stompClient.subscribe("/notifications/public", function (result) {
    console.log(".....");
    console.log(JSON.parse(result.body));
    show(JSON.parse(result.body));
  });

  // stompClient.send(
  //   "/app/hello",
  //   {},
  //   JSON.stringify({
  //     message: "gettin notifications",
  //   })
  // );
});

function show(message) {
  var response = document.getElementById("messages");
  var p = document.createElement("p");
  p.innerHTML = "message: " + message.message;
  response.appendChild(p);
}

const Notifications = () => {
  //

  const sendMessage = () => {
    stompClient.send(
      "/app/sendMessage",
      {},
      JSON.stringify({
        message: "hellow world",
      })
    );
  };

  return (
    <div>
      <div>
        <button id="sendMessage" onClick={sendMessage}>
          Send
        </button>
        <input type="text" id="text" placeholder="Text" />
      </div>
      <br />
      <div>
        <button id="sendPrivateMessage" onclick="sendPrivateMessage();">
          Send Private
        </button>
        <input type="text" id="privateText" placeholder="Private Message" />
        <input type="text" id="to" placeholder="To" />
      </div>
      <br />
      <br />
      <br />

      <div id="messages"></div>
    </div>
  );
};

export default Notifications;
