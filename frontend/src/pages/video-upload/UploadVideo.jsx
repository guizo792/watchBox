import React from "react";
import { useSelector } from "react-redux";
import DragDrop from "../../Components/UploadVideo/DragDrop.jsx";
import VideoDetails from "../../Components/UploadVideo/VideoDetails.jsx";

const UploadVideo = () => {
  const videoDetails = useSelector((state) => state.videoToUploadDetails);

  return <div>{!videoDetails.uploaded ? <DragDrop /> : <VideoDetails />}</div>;
};

export default UploadVideo;
