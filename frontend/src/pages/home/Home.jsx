import VideoComponent from "../../Components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../../services/videoService";
import { useEffect } from "react";
import {
  fetchVideosFailure,
  fetchVideosSuccess,
  fetchVideoStart,
} from "../../store/videosServices/videosServices.action";
import SidebarNav from "../../Components/sidebarNav/sidebarNav";
import LoadingSpinner from "../../Components/loadingSpinner/spinner";

const Home = () => {
  const videosData = useSelector((state) => state.videosServices);
  const dispatch = useDispatch();

  //console.log(videosData);

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
        //console.log(err);
        dispatch(fetchVideosFailure(err));
        //console.log(videosData.errorFetching);
      }
    };
    getVideosData();
  }, []);

  return (
    <div className="flex gap-[20px] flex-wrap sm:flex-nowrap">
      <div className="sticky top-16 left-0 z-50 sm:h-[80vh]">
        <SidebarNav />
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
