import React, { useEffect } from "react";
import Card from "../../Card/Card.component";
import "./Participant.css";
import {
  FaBan,
  FaMicrophoneSlash,
  FaRegCopy,
  FaRegStopCircle,
} from "react-icons/fa";
import firepadRef from "../../../streamingServer/firebase";
import { useSelector } from "react-redux";
import { deleteVideo } from "../../../services/videoService";

const Participant = (props) => {
  const isStreamer = useSelector((state) => state.isStreamer);
  const streamId = useSelector((state) => state.streamId);

  const {
    curentIndex,
    currentParticipant,
    hideVideo,
    videoRef,
    showAvatar,
    currentUser,
    clearStreamData,
    showStreamerControls,
    streamInfos,
  } = props;

  // No participant, nothing to show
  if (!currentParticipant) return <></>;

  if (isStreamer) {
    window.onunload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      firepadRef.remove().then(() => {
        console.log("All data removed successfully.");
      });
    };
    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      console.log(streamId);
      deleteVideo(streamId).then((res) => console.log(res));
    };
  }

  return (
    <div className={`participant ${hideVideo ? "hide" : ""} flex flex-wrap`}>
      <Card>
        <video
          ref={videoRef}
          className="video"
          id={`participantVideo${curentIndex}`}
          autoPlay
          playsInline
        ></video>
        {!currentParticipant.audio && (
          <FaMicrophoneSlash className="muted" title="Muted" />
        )}
        {showAvatar && (
          <div className="avatar">
            <FaBan />
          </div>
        )}
        <div className="name">
          {currentParticipant?.name}
          {currentUser ? `(You)` : ``}
          {/* {currentUser
            ? `(You), ${streamInfos.viewersCount} viewer(s)`
            : `, ${streamInfos.viewersCount} viewer(s)`} */}
        </div>
      </Card>
      <div className="fixed left-[-120px] flex justify-center items-center gap-2 transition-all duration-300">
        <div className="participantsList flex flex-col bg-pink-400 px-4 py-2 rounded-r-md border-white border-[1px] overflow-auto">
          {Object.keys(streamInfos?.uniqueCountedParticipants)?.map(
            (participant, index) => (
              <div
                className="text-white bg-pink-700 px-2 py-1 rounded my-[2px] border-pink-900 border-[1px]"
                key={index}
              >
                ({streamInfos?.uniqueCountedParticipants[participant]}){" "}
                {participant}
              </div>
            )
          )}
        </div>
        <button
          className="text-white font-medium bg-pink-600 hover:bg-pink-800 rounded-md px-2 py-1 transition-all border-pink-600 border-2"
          onClick={(e) => {
            e.preventDefault();
            if (e.target.parentElement.style.left === "-120px") {
              e.target.innerHTML = "X";
              e.target.parentElement.style.left = "-1px";
              return;
            } else {
              e.target.parentElement.style.left = "-120px";
              e.target.innerHTML = "Participants list";
            }
          }}
        >
          Participants list
        </button>
        {showStreamerControls && (
          <div className="flex fixed right-[2%]">
            <button
              onClick={() => {
                const confirmEnding = window.confirm(
                  "Are you sure you want to end the live 🟥"
                );
                if (confirmEnding && streamId) {
                  clearStreamData();
                  deleteVideo(streamId).then((res) => console.log(res));
                  window.location.replace("/");
                }
              }}
              className="text-white  bg-red-600 hover:bg-red-800 rounded-md ml-4 px-2 py-1 border-red-600 border-2"
            >
              <FaRegStopCircle size={22} />
            </button>
            <button
              className="text-white  bg-green-600 hover:bg-green-800 rounded-md ml-4 px-2 py-1 border-green-600 border-2"
              onClick={() => {
                let url = document.location.href;
                navigator.clipboard.writeText(url).then(
                  function () {
                    window.alert("Link Copied!");
                  },
                  function () {
                    window.alert("Copy error");
                  }
                );
              }}
            >
              <FaRegCopy size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participant;
