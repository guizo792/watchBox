import { VideoContainer, ThumbnailImage } from "./VideoStyles.jsx";

import "./Video.css";

const VideoComponent = ({ video }) => {
  return (
    <VideoContainer to={"/videos?id=video.id|||2kl322kj232KLJFD"}>
      <ThumbnailImage className="thumbnail-img">
        <img
          src={`./images/${video.thumbnailImage}`}
          alt="video thumbnail"
          className="thumbnail-img"
          loading="lazy"
        />
      </ThumbnailImage>
      <div className="infos">
        <div className="authorImage">
          <img
            src={`./images/${video.channelImage}`}
            alt="channel"
            className="channel-img"
          />
        </div>
        <div className="video-infos">
          <ul>
            <li className="title">{video.title}</li>
            <li>{video.channel}</li>
            <li>{video.views} views</li>
          </ul>
        </div>
      </div>
    </VideoContainer>
  );
};

export default VideoComponent;
