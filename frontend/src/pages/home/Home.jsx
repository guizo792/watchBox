import VideoComponent from "../../Components/video/Video";

import { Icon } from "@iconify/react";

import "./Home.css";
import { Link } from "react-router-dom";

export const videos = [
  {
    id: "1",
    title: "Learning web development",
    channel: "Modern Web",
    views: "345K",
    thumbnailImage: "webdev.jpg",
    channelImage: "channel1.jpeg",
  },
  {
    id: "2",
    title: "Cooking chinese food",
    channel: "Asian Food",
    views: "1.2M",
    thumbnailImage: "chineseFood.jpg",
    channelImage: "channel3.jpg",
  },
  {
    id: "3",
    title: "Traveling to DUBAI",
    channel: "TimTours",
    views: "4.3M",
    thumbnailImage: "travel.jpg",
    channelImage: "channel2.jpeg",
  },
  {
    id: "4",
    title: "Learning web development",
    channel: "Modern Web",
    views: "345K",
    thumbnailImage: "webdev.jpg",
    channelImage: "channel2.jpeg",
  },
  {
    id: "5",
    title: "Cooking chinese food",
    channel: "Asian Food",
    views: "1.2M",
    thumbnailImage: "chineseFood.jpg",
    channelImage: "channel1.jpeg",
  },
  {
    id: "6",
    title: "Traveling to DUBAI",
    channel: "TimTours",
    views: "4.3M",
    thumbnailImage: "travel.jpg",
    channelImage: "channel3.jpg",
  },
];

const Home = () => {
  return (
    <div className="home-container">
      <div className="sidebar-nav sticky top-16 left-0 z-50 sm:h-[50vh]">
        <ul className="sidebar-nav-links">
          <Link className="sidebar-nav-link">
            <Icon icon="ic:round-home" className="sidebar-nav-icon" />
            <span>Home</span>
          </Link>
          <Link className="sidebar-nav-link">
            <Icon
              icon="material-symbols:subscriptions"
              className="sidebar-nav-icon"
            />
            <span>Subscriptions</span>
          </Link>
          <Link className="sidebar-nav-link">
            <Icon icon="bxs:like" className="sidebar-nav-icon" />
            <span>Liked Videos</span>
          </Link>
        </ul>
      </div>
      <div className="videos-section">
        {videos.map((video) => (
          <VideoComponent video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
