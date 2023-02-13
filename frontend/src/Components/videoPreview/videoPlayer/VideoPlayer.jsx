import React from "react";
import { BigPlayButton, Player } from "video-react";

import "./VideoPlayer.css";

const VideoPlayer = ({ video }) => {
  // console.log(video);
  return (
    <Player
      playsInline
      poster={`${video.thumbnailUrl}`}
      src={`${video.videoUrl}`}
      // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    >
      <BigPlayButton position="center" className="rounded-2xl" />
    </Player>
  );
};

export default VideoPlayer;
