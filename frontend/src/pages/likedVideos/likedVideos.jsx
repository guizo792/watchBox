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
    <div className="flex gap-[20px] flex-wrap sm:flex-nowrap">
      <div className="sticky top-16 left-0 z-50 sm:h-[80vh]">
        <SidebarNav />
      </div>
      <div className="videos-section pl-5 min-h-[92vh] w-[100%]">
        {!loading && (
          <>
            {likedVideos?.length !== 0
              ? likedVideos?.map((video, index) => (
                  <VideoComponent video={video} key={index} />
                ))
              : "No liked videos"}
          </>
        )}
        {loading && !loadingError && <LoadingSpinner />}
        {loadingError && (
          <div className="text-red-900 font-medium">
            There was an error loading liked videos details
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedVideos;
