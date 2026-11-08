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
import VideoSkeleton from "../../Components/video/VideoSkeleton";

const Home = () => {
  const videosData = useSelector((state) => state.videosServices);
  const appUser = useSelector((state) => state.appUser);
  const dispatch = useDispatch();

  //console.log(videosData);

  useEffect(() => {
    const getVideosData = async () => {
      try {
        dispatch(fetchVideoStart());
        const videos = await getAllVideos(appUser?.currentUser?.id);
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
      <div className="sticky top-16 z-30 w-full bg-white/90 backdrop-blur sm:w-56 sm:shrink-0 sm:self-start">
        <SidebarNav />
      </div>

      <main className="mt-8 min-h-[80vh] flex-1 px-4 pb-12 sm:pr-6">
        {videosData.isFetching ? (
          <div className="video-grid">
            {Array.from({ length: 8 }, (_, i) => (
              <VideoSkeleton key={i} />
            ))}
          </div>
        ) : videosData.videos.length === 0 ? (
          <div className="mx-auto flex max-w-sm flex-col items-center gap-3 pt-10 text-center">
            <img src="/images/img404.png" alt="" className="w-full" />
            <h2 className="text-lg font-semibold">No videos yet</h2>
            <p className="text-sm text-muted">
              Nothing to watch right now. Check back soon or upload the first
              one.
            </p>
          </div>
        ) : (
          <div className="video-grid">
            {videosData.videos.map((video) => (
              <VideoComponent video={video} key={video.id} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
