import React, { useEffect, useRef } from "react";
import "./Participants.css";
import { connect } from "react-redux";
import Participant from "./Participant/Participant.component";
import firepadRef from "../../streamingServer/firebase";
import { setIsStreamer } from "../../store/liveVideoStreaming/action";

const Participants = (props) => {
  // Participants who joined the live
  let streamInfos = useRef({});
  // console.log(uniqueCountedWatchers.current);
  // console.log(watchers.current);

  // const participants = useRef(null);

  const clearStreamData = () => {
    console.log("clearing...😲❄");
    firepadRef
      .remove()
      .then(() => {
        console.log("All data removed successfully.");
      })
      .catch((error) => {
        console.error("Error removing data:", error);
      });
  };
  // console.log(props);
  // Used to get the original participants data from firebase
  // const firebaseParticipants = useRef(null);
  const participantRef = firepadRef.child("participants");

  participantRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const streamParticipantsNames = Object.values(snapshot.val())?.map(
        (item) => item?.userName
      );
      streamInfos.current.viewersCount = Object.keys(snapshot.val()).length;
      streamInfos.current.uniqueCountedParticipants = {};
      for (const participant of streamParticipantsNames) {
        streamInfos.current.uniqueCountedParticipants[participant] = streamInfos
          .current.uniqueCountedParticipants[participant]
          ? streamInfos.current.uniqueCountedParticipants[participant] + 1
          : 1;
      }
    }
    // console.log(streamInfos);
  });

  const videoRef = useRef(null);
  let participantKey = Object.keys(props.participants);
  // console.log(props.participants);
  // let thereIsFirstParticipant = Object.entries(props.participants)[0]?.length;
  let firstParticipantKey;
  if (props.streamer) {
    firstParticipantKey = Object.keys(props.streamer)[0];
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = props.stream;
      videoRef.current.muted = true;
    }
  }, [props.currentUser, props.stream]);

  const currentUser = props.currentUser
    ? Object.values(props.currentUser)[0]
    : null;

  const screenPresenter = participantKey.find((element) => {
    const currentParticipant = props.participants[element];
    return currentParticipant.screen;
  });

  const participants = participantKey.map((element, index) => {
    if (element === firstParticipantKey) {
      const streamerParticipant = props.participants[firstParticipantKey];
      const pc = streamerParticipant.peerConnection;
      const remoteStream = new MediaStream();
      let curentIndex = index;
      if (pc) {
        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
          const videElement = document.getElementById(
            `participantVideo${curentIndex}`
          );
          if (videElement) videElement.srcObject = remoteStream;
        };
      }

      return (
        <Participant
          participantKey={element}
          key={curentIndex}
          currentParticipant={streamerParticipant}
          curentIndex={curentIndex}
          hideVideo={screenPresenter && screenPresenter !== element}
          streamInfos={streamInfos?.current}
          showAvatar={
            streamerParticipant &&
            !streamerParticipant.video &&
            !streamerParticipant.screen
          }
        />
      );
    }
  });
  participants?.forEach((p) => {
    // console.log(p?.props);
    if (
      p?.props?.curentIndex === 0 &&
      p?.props?.currentParticipant?.name !== "Guest"
    ) {
      // console.log("hi");
      props.setIsStreamer(true);
    }
  });
  return (
    <div className={`participants`}>
      {!props.isStreamer && participants}
      {props.isStreamer && (
        <Participant
          streamInfos={streamInfos?.current}
          currentParticipant={currentUser}
          clearStreamData={clearStreamData}
          showStreamerControls={true}
          curentIndex={participantKey.length}
          hideVideo={screenPresenter && !currentUser.screen}
          videoRef={videoRef}
          showAvatar={currentUser && !currentUser.video && !currentUser.screen}
          currentUser={true}
        />
      )}

      {/* {participants.length === 1 && !props.isStreamer && (
        <div className="text-pink-500 font-bold text-center text-[3rem]">
          Live ended
        </div>
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    participants: state.participants,
    currentUser: state.currentUser,
    stream: state.mainStream,
    isStreamer: state.isStreamer,
    streamer: state.streamer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsStreamer: (isStreamer) => dispatch(setIsStreamer(isStreamer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Participants);
