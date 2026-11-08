import { Link, useSearchParams } from "react-router-dom";
import Comments from "../../Components/videoPreview/videoComments/Comments";
import VideoInfos from "../../Components/videoPreview/videoInfos/VideoInfos";
import VideoPlayer from "../../Components/videoPreview/videoPlayer/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchVideoFailure,
  fetchVideoStart,
  fetchVideoSuccess,
} from "../../store/videosServices/videosServices.action";
import { getAllVideos, getVideo } from "../../services/videoService";
import { countFormatter } from "../../utils/countFormatter";

const WatchSkeleton = () => (
  <div
    className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-6"
    aria-hidden="true"
  >
    <div className="space-y-4">
      <div className="skeleton aspect-video w-full !rounded-xl" />
      <div className="skeleton h-7 w-3/4" />
      <div className="skeleton h-12 w-1/2" />
      <div className="skeleton h-24 w-full !rounded-xl" />
    </div>
    <div className="hidden space-y-4 lg:block">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex gap-3">
          <div className="skeleton aspect-video w-40 shrink-0 !rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VideoPreview = () => {
  const [searchParams] = useSearchParams();
  // Global videos state
  const videosData = useSelector((state) => state.videosServices);
  // Global user state
  const appUser = useSelector((state) => state.appUser);
  const dispatch = useDispatch();
  const idParam = searchParams.get("id");

  useEffect(() => {
    dispatch(fetchVideoStart());
    const getVideoData = async () => {
      try {
        let video;
        if (idParam) video = await getVideo(searchParams.get("id"));
        if (video.data) {
          dispatch(fetchVideoSuccess(video.data));
          dispatch(fetchVideoFailure(null));
        }

        if (video.name === "AxiosError") {
          dispatch(fetchVideoFailure(video.response));
        }
      } catch (err) {
        //.log(err);
      }
    };

    getVideoData();
  }, [idParam]);

  // When the page is opened directly (not via Home) the store has no list yet,
  // so load "Up next" locally without touching the shared fetching/error state.
  const [fallbackVideos, setFallbackVideos] = useState([]);
  const hasStoreVideos = (videosData.videos || []).length > 0;
  useEffect(() => {
    if (hasStoreVideos) return;
    let cancelled = false;
    getAllVideos(appUser?.currentUser?.id)
      .then((res) => {
        if (!cancelled && Array.isArray(res?.data?.data))
          setFallbackVideos(res.data.data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [hasStoreVideos]);

  if (videosData.isFetching) return <WatchSkeleton />;

  if (videosData.error) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-16 text-center">
        <img src="/images/img404.png" alt="" className="w-full" />
        <h1 className="text-lg font-semibold">We couldn't find that video</h1>
        <p className="text-sm text-muted">
          It may have been removed, or the link is wrong.
        </p>
        <Link to="/" className="btn-primary mt-2">
          Back to home
        </Link>
      </div>
    );
  }

  if (!videosData.video) return null;

  const upNext = (hasStoreVideos ? videosData.videos : fallbackVideos).filter(
    (v) => v.id !== videosData.video.id
  );

  return (
    <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-6">
      <div className="min-w-0">
        <div className="overflow-hidden rounded-xl bg-black shadow-card">
          <VideoPlayer video={videosData.video} />
        </div>
        <VideoInfos video={videosData.video} />
        <Comments currentUserId={appUser?.currentUser?.id} />
      </div>

      <aside aria-label="Up next" className="min-w-0">
        <h2 className="mb-3 text-base font-semibold">Up next</h2>
        <div className="flex flex-col gap-4">
          {upNext.map((video) => (
            <Link
              to={`/videos?id=${video.id}`}
              key={video.id}
              className="group flex gap-3"
            >
              <img
                src={video.thumbnailUrl}
                alt=""
                loading="lazy"
                className="aspect-video w-40 shrink-0 rounded-lg bg-surface-sunken object-cover shadow-card transition-shadow group-hover:shadow-card-hover"
              />
              <div className="min-w-0">
                <h3 className="line-clamp-2-fallback text-sm font-semibold leading-snug group-hover:text-brand">
                  {video.title}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {countFormatter(video.viewsCount)} views
                </p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default VideoPreview;
