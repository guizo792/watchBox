import React, { useEffect, useState } from "react";
import {
  FaDesktop,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./MeetingFooter.css";
import { useSelector } from "react-redux";
const MeetingFooter = (props) => {
  const isStreamer = useSelector((state) => state.isStreamer);

  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });
  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };
  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);
  return (
    <>
      {isStreamer && (
        <div className="meeting-footer">
          <div
            className={"meeting-icons " + (!streamState.mic ? "active" : "")}
            title={streamState.mic ? "Mute Audio" : "Unmute Audio"}
            onClick={micClick}
          >
            {streamState.mic ? (
              <FaMicrophone size={22} />
            ) : (
              <FaMicrophoneSlash size={22} />
            )}
          </div>
          <div
            className={"meeting-icons " + (!streamState.video ? "active" : "")}
            title={streamState.video ? "Hide Video" : "Show Video"}
            onClick={onVideoClick}
          >
            {streamState.video ? (
              <FaVideo size={22} />
            ) : (
              <FaVideoSlash size={22} />
            )}
          </div>
          <div
            className="meeting-icons"
            title="Share Screen"
            onClick={onScreenClick}
            disabled={streamState.screen}
          >
            <FaDesktop size={22} />
          </div>
          <ReactTooltip />
        </div>
      )}
    </>
  );
};

export default MeetingFooter;
