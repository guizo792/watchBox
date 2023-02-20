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
          console.log(userData);
          const likedVideos =
            userData?.likedVideos &&
            (await Promise.all(
              userData?.likedVideos?.map((videoId) =>
                getVideo(videoId).then((res) => res.data)
              )
            ));

          setLikedVideos(likedVideos);
          console.log(likedVideos);
          setLoading(false);
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
      <div className="videos-section pl-5 min-h-[92vh] w-[100%]">
        {!loading && (
          <>
            {likedVideos.length !== 0
              ? likedVideos?.map((video, index) => (
                  <VideoComponent video={video} key={index} />
                ))
              : "No liked videos"}
          </>
        )}
        {loading && <LoadingSpinner />}
      </div>
      {/* <div className="videos-section pl-5 min-h-[92vh]">
        {!loading &&
          likedVideos.map((video) => (
            <VideoComponent video={video} key={video.id} />
          ))}
      </div> */}
    </div>
  );
};

export default LikedVideos;
