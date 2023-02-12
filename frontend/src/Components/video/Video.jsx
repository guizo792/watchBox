import { VideoContainer, ThumbnailImage } from "./VideoStyles.jsx";

import "./Video.css";
import { viewsCountFormatter } from "../../utils/viewsCountFormatter.js";

const VideoComponent = ({ video }) => {
  return (
    <VideoContainer to={`/videos?id=${video.id}`}>
      <ThumbnailImage className="thumbnail-img">
        <img
          src={`${video.thumbnailUrl}`}
          alt="video thumbnail"
          className="thumbnail-img"
          loading="lazy"
        />
      </ThumbnailImage>
      <div className="infos">
        <div className="authorImage">
          <img
            src={`./images/channel1.jpeg`}
            alt="channel"
            className="channel-img"
          />
        </div>
        <div className="video-infos">
          <ul>
            <li className="title">{video.title}</li>
            <li>channel name (user.📷)</li>
            <li>{viewsCountFormatter(video.viewsCount)} views</li>
          </ul>
        </div>
      </div>
    </VideoContainer>
  );
};

export default VideoComponent;
