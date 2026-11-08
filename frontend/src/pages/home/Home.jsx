import VideoComponent from "../../Components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../../services/videoService";
import { useEffect, useMemo, useState } from "react";
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

  // Tag filter: the most common tags across loaded videos become chips
  const [activeTag, setActiveTag] = useState(null);
  const topTags = useMemo(() => {
    const counts = {};
    (videosData.videos || []).forEach((v) =>
      (v.tags || []).forEach((t) => {
        const tag = String(t).trim();
        if (tag) counts[tag] = (counts[tag] || 0) + 1;
      })
    );
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [videosData.videos]);
  const visibleVideos = activeTag
    ? (videosData.videos || []).filter((v) => v.tags?.includes(activeTag))
    : videosData.videos;

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
    <div className="mx-auto flex max-w-[1500px] flex-wrap gap-5 sm:flex-nowrap sm:px-6 lg:px-8">
      <div className="sticky top-16 z-30 w-full bg-surface/90 backdrop-blur sm:w-56 sm:shrink-0 sm:self-start">
        <SidebarNav />
      </div>

      <main className="mt-4 min-h-[80vh] sm:mt-6 min-w-0 flex-1 px-3 pb-12 sm:px-0">
        {topTags.length > 0 && !videosData.isFetching && (
          <div
            role="toolbar"
            aria-label="Filter videos by tag"
            className="scrollbar-hide -mx-3 mb-6 flex gap-2 overflow-x-auto px-3 sm:mx-0 sm:px-0"
          >
            {[null, ...topTags].map((tag) => (
              <button
                key={tag ?? "all"}
                type="button"
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag(tag)}
                className={
                  "shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors " +
                  (activeTag === tag
                    ? "bg-ink text-surface"
                    : "bg-surface-sunken text-ink hover:bg-line")
                }
              >
                {tag ?? "All"}
              </button>
            ))}
          </div>
        )}
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
            {visibleVideos.map((video) => (
              <VideoComponent video={video} key={video.id} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
