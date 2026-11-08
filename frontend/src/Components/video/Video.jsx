import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { countFormatter } from "../../utils/countFormatter";
import { getUser } from "../../services/userService.js";
import Avatar from "../Avatar/Avatar";
import Thumbnail from "./Thumbnail";

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

  const watchPath = "/videos?id=" + video.id;
  const isLive = video?.title?.startsWith("Live stream");
  // Live streams link out to their stream url (full page load), everything
  // else is a client-side route.
  const liveHref = video?.title?.startsWith("Live streaming")
    ? video?.videoUrl || watchPath
    : watchPath;

  const Wrapper = isLive ? "a" : Link;
  const wrapperProps = isLive ? { href: liveHref } : { to: watchPath };

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col gap-3 rounded-xl focus-visible:outline-offset-4"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-surface-sunken shadow-card transition-shadow duration-300 group-hover:shadow-card-hover">
        <Thumbnail
          src={video?.thumbnailUrl}
          alt={`Thumbnail for ${video?.title ?? "video"}`}
          className="duration-500 ease-out group-hover:scale-105"
        />
        {isLive && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-md bg-brand px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Live
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <Avatar
          src={videoUser?.profilePicture}
          name={videoUser?.username}
          className="mt-0.5 h-9 w-9 text-sm"
        />
        <div className="min-w-0">
          <h3
            className="line-clamp-2-fallback text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand"
            title={video?.title}
          >
            {video?.title}
          </h3>
          <p className="mt-1 truncate text-sm text-muted">
            {videoUser?.username || "No name"}
          </p>
          <p className="text-sm text-muted">
            {countFormatter(video?.viewsCount)} views
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default VideoComponent;
