import MainScreen from "../../Components/MainScreen/MainScreen.component";
import firepadRef, { db } from "../../streamingServer/firebase";
import { useEffect } from "react";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
  setStreamer,
} from "../../store/liveVideoStreaming/action";
import { connect, useSelector } from "react-redux";

function LiveStream(props) {
  const userName =
    JSON.parse(localStorage.getItem("user"))?.username || "Guest";
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };
  useEffect(() => {
    const asyncFunc = async () => {
      const stream = await getUserStream();
      stream.getVideoTracks()[0].enabled = false;
      props.setMainStream(stream);

      connectedRef.on("value", (snap) => {
        if (snap.val()) {
          const defaultPreference = {
            audio: true,
            video: false,
            screen: false,
          };
          const userStatusRef = participantRef.push({
            userName,
            timestamp: db.database.ServerValue.TIMESTAMP,
            preferences: defaultPreference,
          });
          props.setUser({
            [userStatusRef.key]: { name: userName, ...defaultPreference },
          });
          userStatusRef.onDisconnect().remove();
        }
      });
    };
    asyncFunc();
  }, []);

  const connectedRef = db.database().ref(".info/connected");
  const participantRef = firepadRef.child("participants");

  const isUserSet = !!props.user;
  const isStreamSet = !!props.stream;

  useEffect(() => {
    if (isStreamSet && isUserSet) {
      participantRef.on("child_added", (snap) => {
        participantRef
          .orderByChild("timestamp")
          .limitToFirst(1)
          .once("value")
          .then(function (snapshot) {
            // The data is returned as a snapshot
            var firstElement = snapshot.val();
            props.setStreamer(firstElement);
            // console.log("1️⃣", firstElement);
          });

        const preferenceUpdateEvent = participantRef
          .child(snap.key)
          .child("preferences");
        preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
          props.updateParticipant({
            [snap.key]: {
              [preferenceSnap.key]: preferenceSnap.val(),
            },
          });
        });
        const { userName: name, preferences = {} } = snap.val();
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      participantRef.on("child_removed", (snap) => {
        props.removeParticipant(snap.key);
      });
    }
  }, [isStreamSet, isUserSet, participantRef, props]);

  return (
    <div className="App">
      <MainScreen />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    user: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    addParticipant: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(setUser(user)),
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
    setStreamer: (streamer) => dispatch(setStreamer(streamer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveStream);
