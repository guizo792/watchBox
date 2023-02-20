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

  useEffect(() => {
    setLoading(true);
    const getSubscriptionsData = async () => {
      if (appUser?.currentUser?.id) {
        try {
          const userData = await getUser(appUser?.currentUser?.id);

          const likedVideos = await Promise.all(
            userData?.likedVideos?.map((videoId) =>
              getVideo(videoId).then((res) => res.data.data)
            )
          );

          setLikedVideos(likedVideos);
          setLoading(false);
          console.log(likedVideos);
        } catch (err) {
          console.log(err);
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
      <div className="videos-section pl-5 min-h-[92vh]">
        {!loading &&
          likedVideos.map((video) => (
            <VideoComponent video={video} key={video.id} />
          ))}
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default LikedVideos;
