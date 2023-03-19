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
  setStreamId,
} from "../../store/liveVideoStreaming/action";
import { connect, useSelector } from "react-redux";
import { createVideo, getAllVideos } from "../../services/videoService";

function LiveStream(props) {
  const isStreamer = useSelector((state) => state.isStreamer);

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.username || "Guest";
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };
  useEffect(() => {
    const asyncFunc = async () => {
      // Handling stream and session
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

      //   // Get all videos and check if the live doesn't exist
      //   let liveExist = false;
      //   const videos = await getAllVideos();
      //   console.log(videos?.data?.data);
      //   videos?.data?.data?.forEach((video) => {
      //     if (video.title === `Live streaming from ${userName}`) liveExist = true;
      //   });

      //   // Creating the liveStream as a video in DB to show it to users
      //   console.log(isStreamer);
      //   if (isStreamer && !liveExist) {
      //     const res = await createVideo({
      //       description: `live streaming from ${userName}, enjoy the stream without cut offs, join us to start streaming yourself too and gather your own community. VIDEOBOX help you break the limits`,
      //       title: `Live streaming from ${userName}`,
      //       userId: `${user.id}`,
      //       likes: 0,
      //       dislikes: 0,
      //       tags: ["live stream"],
      //       videoURL: window.location.href,
      //       videoStatus: "public",
      //       viewsCount: 0,
      //       thumbnailUrl:
      //         "https://media.gettyimages.com/id/1306922705/vector/live-stream-banner.jpg?s=612x612&w=gi&k=20&c=5lgXBYQJSgo4QSRGeODWkpFUp915Nz7p9pKuKjrZ9Yw=",
      //     });
      //     if (res.status === 201) {
      //       console.log("LIVE STREAM CREATED SUCCESSFULLY 🟩");
      //     }
      //   }
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      // Get all videos and check if the live doesn't exist
      let liveExist = false;
      const videos = await getAllVideos();
      console.log(videos?.data?.data);
      videos?.data?.data?.forEach((video) => {
        if (video.title === `Live streaming from ${userName}`) liveExist = true;
      });

      // Creating the liveStream as a video in DB to show it to users
      console.log(isStreamer);
      if (isStreamer && !liveExist) {
        const res = await createVideo({
          description: `live streaming from ${userName}, enjoy the stream without cut offs, join us to start streaming yourself too and gather your own community. VIDEOBOX help you break the limits`,
          title: `Live streaming from ${userName}`,
          userId: `${user.id}`,
          likes: 0,
          dislikes: 0,
          tags: ["live stream"],
          videoURL: window.location.href,
          videoStatus: "public",
          viewsCount: 0,
          thumbnailUrl:
            "https://media.gettyimages.com/id/1306922705/vector/live-stream-banner.jpg?s=612x612&w=gi&k=20&c=5lgXBYQJSgo4QSRGeODWkpFUp915Nz7p9pKuKjrZ9Yw=",
        });
        if (res.status === 201) {
          console.log("LIVE STREAM CREATED SUCCESSFULLY 🟩");
          props.setStreamId(res?.data?.id);
        }
      }
    };
    asyncFunc();
  }, [isStreamer]);

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
    setStreamId: (id) => dispatch(setStreamId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveStream);
