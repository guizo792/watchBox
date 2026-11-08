import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../Components/loadingSpinner/spinner";
import SidebarNav from "../../Components/sidebarNav/sidebarNav";
import VideoComponent from "../../Components/video/Video";
import { getUser } from "../../services/userService";
import { getVideo } from "../../services/videoService";

const LikedVideos = () => {
  const appUser = useSelector((state) => state.appUser);
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getSubscriptionsData = async () => {
      if (appUser?.currentUser?.id) {
        try {
          const userData = await getUser(appUser?.currentUser?.id);
          // if (!userData?.message === 'Network Error')
          const likedVideos = await Promise.all(
            userData?.likedVideos?.map((videoId) =>
              getVideo(videoId).then((res) => res.data)
            )
          );

          setLikedVideos(likedVideos);
          setLoading(false);
        } catch (err) {
          setLoadingError(err);
        }
      }
    };
    getSubscriptionsData();
  }, [appUser.currentUser]);

  return (
    <div className="mx-auto flex max-w-[1500px] flex-wrap gap-5 sm:flex-nowrap sm:px-6 lg:px-8">
      <div className="sticky top-16 z-30 w-full bg-surface/90 backdrop-blur sm:w-56 sm:shrink-0 sm:self-start">
        <SidebarNav />
      </div>
      <main className="mt-8 min-h-[80vh] min-w-0 flex-1 px-3 pb-12 sm:px-0">
        {!loading &&
          (likedVideos?.length !== 0 ? (
            <div className="video-grid">
              {likedVideos?.map((video, index) => (
                <VideoComponent video={video} key={index} />
              ))}
            </div>
          ) : (
            <p className="pt-10 text-center text-muted">No liked videos yet</p>
          ))}
        {loading && !loadingError && <LoadingSpinner />}
        {loadingError && (
          <div className="text-red-900 font-medium">
            There was an error loading liked videos details
          </div>
        )}
      </main>
    </div>
  );
};

export default LikedVideos;
