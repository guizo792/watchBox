import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../store/notifications/notification.action";
import { stompClient } from "../../services/notifications";

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
        dispatch(setNotification([JSON.parse(result.body)]));
      }
    );
  });

  return;
};

export default Notifications;
