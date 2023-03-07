import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BigPlayButton, Player } from "video-react";
import { ViewVideo } from "../../../services/videoService";
import { fetchVideoSuccess } from "../../../store/videosServices/videosServices.action";

import "./VideoPlayer.css";

const VideoPlayer = ({ video }) => {
  //console.log(video);

  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [segments, setSegments] = useState([]);
  const [totlaTimeWatched, setTotalTime] = useState(0);
  const [viewed, setViewd] = useState(false);

  const dispatch = useDispatch();

  // side effect for time watched tracking :
  useEffect(() => {
    //
    const getTotalWatchTime = async () => {
      setTotalTime(
        segments.reduce((total, segment) => total + segment.duration, 0)
      );

      if (duration !== null) {
        // console.log(duration / 4 + "--------" + totlaTimeWatched);
        if (duration / 4 <= totlaTimeWatched) {
          //console.log("yeees");
          //console.log("here we count view");
          const newVideData = await ViewVideo(video.id, video.viewsCount + 1);
          dispatch(fetchVideoSuccess(newVideData));
          setViewd(true);
        }
      }
    };

    if (!viewed) {
      getTotalWatchTime();
    }
    //
  }, [segments, totlaTimeWatched]);

  const handleSegmentStart = () => {
    setStartTime(Date.now());
  };

  const handleSegmentEnd = () => {
    if (startTime !== null) {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      setSegments([...segments, { startTime, endTime, duration }]);
      setStartTime(null);
    }
  };

  const handleTimeUpdate = (e) => {
    const segmentStartTimes = segments.map((segment) => segment.startTime);

    if (startTime !== null || segmentStartTimes.includes(null)) {
      const startTimeToUpdate =
        startTime || segmentStartTimes.filter((time) => time !== null)[0];
      const endTime = Date.now();
      const duration = (endTime - startTimeToUpdate) / 1000;

      setTotalTime((totlaTimeWatched) => totlaTimeWatched + duration);
    }
  };

  return (
    <Player
      onPlay={handleSegmentStart}
      onPause={handleSegmentEnd}
      onEnded={handleSegmentEnd}
      playsInline
      poster={`${video.thumbnailUrl}`}
      src={`${video.videoUrl}`}
      onTimeUpdate={(e) => {
        duration === null && setDuration(e.target.duration);
        handleTimeUpdate();
      }}
      // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    >
      <BigPlayButton position="center" className="rounded-2xl" />
    </Player>
  );
};

export default VideoPlayer;
