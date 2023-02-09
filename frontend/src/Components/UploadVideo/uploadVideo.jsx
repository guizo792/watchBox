import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savVideoDetails } from "../../store/video/video.action.js";
import DragDrop from "./DragDrop.jsx";
import VideoDetails from "./VideoDetails.jsx";

const UploadVideo = () => {
  const videoDetails = useSelector((state) => state.videoToUploadDetails);

  console.log(videoDetails);
  return <div>{!videoDetails.uploaded ? <DragDrop /> : <VideoDetails />}</div>;
};

export default UploadVideo;
