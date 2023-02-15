import VideoComponent from "../../Components/video/Video";

import { Icon } from "@iconify/react";

import "./Home.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../../services/videoService";
import { useEffect } from "react";
import {
  fetchVideosFailure,
  fetchVideosSuccess,
  fetchVideoStart,
} from "../../store/videosServices/videosServices.action";

import LoadingSpinner from "../../Components/loadingSpinner/spinner";

const Home = () => {
  const videosData = useSelector((state) => state.videosServices);
  const dispatch = useDispatch();

  console.log(videosData);

  useEffect(() => {
    const getVideosData = async () => {
      try {
        dispatch(fetchVideoStart());
        const videos = await getAllVideos();
        // console.log(videos.data.data);
        if (videos?.data?.data) {
          dispatch(fetchVideosSuccess(videos.data.data));
          // console.log(videosData);
        } else {
          dispatch(fetchVideosFailure("There was an error fetching videos"));
        }
      } catch (err) {
        console.log(err);
        dispatch(fetchVideosFailure(err));
        console.log(videosData.errorFetching);
      }
    };
    getVideosData();
  }, []);

  return (
    <div className="home-container">
      <div className="sticky top-16 left-0 z-50 sm:h-[80vh]">
        <ul className="sidebar-nav-links">
          <Link to={"/"} className="sidebar-nav-link">
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
      <div className="videos-section pl-5">
        {!videosData.isFetching && videosData.videos.length === 0 ? (
          <>
            <img src="/images/img404.png" alt="" className="h-full w-full" />
          </>
        ) : (
          videosData.videos.map((video) => (
            <VideoComponent video={video} key={video.id} />
          ))
        )}
      </div>
      {videosData.isFetching && <LoadingSpinner />}
    </div>
  );
};

export default Home;
