import { VideoContainer, ThumbnailImage } from "./VideoStyles.jsx";

import "./Video.css";
import { countFormatter } from "../../utils/countFormatter";
import { useEffect, useState } from "react";
import { getUser } from "../../services/userService.js";

const VideoComponent = ({ video }) => {
  const [videoUser, setVideoUser] = useState(null);

  useEffect(() => {
    // Get and set the video user state
    if (video?.userId) {
      getUser(video?.userId).then((res) => {
        setVideoUser(res);
      });
    }
  }, [video]);

  return (
    <>
      {" "}
      {!video?.title?.startsWith("Live stream") ? (
        <VideoContainer
          to={
            (video?.title?.startsWith("Live streaming")
              ? video?.videoUrl
              : "/videos?id=" + video.id) || "/videos?id=" + video.id
          }
        >
          <ThumbnailImage className="thumbnail-img">
            <img
              src={`${video?.thumbnailUrl}`}
              alt="video thumbnail"
              className="thumbnail-img"
              loading="lazy"
            />
          </ThumbnailImage>
          <div className="infos">
            <div className="authorImage">
              <img
                src={`${
                  videoUser?.profilePicture || "/images/defaultProfile.jpg"
                } `}
                alt="channel"
                className="channel-img min-w-[3rem] min-h-[3rem]"
              />
            </div>
            <div className="video-infos">
              <ul>
                <li className="title max-w-[100%] max-h-[1.4rem] overflow-hidden">
                  {video?.title}
                </li>
                <li className="font-medium">
                  {videoUser?.username || "No name"}
                </li>
                <li>{countFormatter(video?.viewsCount)} views</li>
              </ul>
            </div>
          </div>
        </VideoContainer>
      ) : (
        <a
          className="videoContainer"
          href={
            (video?.title?.startsWith("Live streaming")
              ? video?.videoUrl
              : "/videos?id=" + video.id) || "/videos?id=" + video.id
          }
        >
          <ThumbnailImage className="thumbnail-img">
            <img
              src={`${video?.thumbnailUrl}`}
              alt="video thumbnail"
              className="thumbnail-img"
              loading="lazy"
            />
          </ThumbnailImage>
          <div className="infos">
            <div className="authorImage">
              <img
                src={`${
                  videoUser?.profilePicture || "/images/defaultProfile.jpg"
                } `}
                alt="channel"
                className="channel-img min-w-[3rem] min-h-[3rem]"
              />
            </div>
            <div className="video-infos">
              <ul>
                <li className="title max-w-[100%] max-h-[1.4rem] overflow-hidden">
                  {video?.title}
                </li>
                <li className="font-medium">
                  {videoUser?.username || "No name"}
                </li>
                <li>{countFormatter(video?.viewsCount)} views</li>
              </ul>
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default VideoComponent;
