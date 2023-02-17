import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { ReactComponent as Share } from "../../../assets/share.svg";
import { ReactComponent as Download } from "../../../assets/download.svg";
import { countFormatter } from "../../../utils/countFormatter";
import { dislikeVideo, likeVideo } from "../../../services/videoService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../../../store/user/user.action";
import { fetchVideoSuccess } from "../../../store/videosServices/videosServices.action";

const VideoInfos = ({ video }) => {
  const appUser = useSelector((state) => state.appUser);

  const [loggedInUserReact, setUserReact] = useState({
    liked: false,
    disliked: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const isLikedVideosContainVideo = () => {
      appUser?.currentUser?.likedVideos?.forEach((element) => {
        console.log("heeere");
        if (element === video.id) {
          setUserReact({
            disliked: false,
            liked: true,
          });
        }
      });

      appUser?.currentUser?.dislikedVideos?.forEach((element) => {
        console.log("heeere");
        if (element === video.id) {
          setUserReact({
            liked: false,
            disliked: true,
          });
        }
      });
    };

    isLikedVideosContainVideo();
  }, [video]);

  console.log(appUser);

  const handelLike = async () => {
    //
    if (!appUser.isLoggedIn) {
      //
      alert("You must be logged in to perform this action");
    } else {
      const { userAfterLike, videoAfterLike } = await likeVideo(
        video,
        appUser.currentUser
      );

      dispatch(setUser(userAfterLike));
      dispatch(fetchVideoSuccess(videoAfterLike));
    }
  };

  const handleDislike = async () => {
    //
    if (!appUser.isLoggedIn) {
      //
      alert("You must be logged in to perform this action");
    } else {
      const { userAfterDislike, videoAfterDislike } = await dislikeVideo(
        video,
        appUser.currentUser
      );

      dispatch(setUser(userAfterDislike));
      dispatch(fetchVideoSuccess(videoAfterDislike));
    }
  };

  return (
    <div className="video-infos-container flex flex-col gap-y-5 py-3 px-5">
      <div className="title font-medium text-xl	">{video.title}</div>
      <div className="other-infos flex gap-5 items-center justify-around basis-1 flex-wrap">
        <div className="channel flex gap-5 flex-nowrap items-center">
          <div className="channel-img ">
            <img
              src="./images/channel1.jpeg"
              alt="channel"
              className="w-14 h-14 rounded-full border-[3px] border-pink-700 border-solid"
            />
          </div>
          <div className="flex flex-col justify-around">
            <div className="channel-name font-medium text-[16px]">
              Channel name
            </div>
            <div className="channel-subscribers text-[16px]">32.3K subs</div>
          </div>
        </div>
        <div className="subscribe-btn">
          <button
            type="button"
            className=" focus:outline-none text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 rounded-lg px-3 py-1 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900 text-[20px]"
            onClick={handleSubscription}
          >
            Subscribe
          </button>
        </div>
        <div className="like-dislike flex gap-2 flex-nowrap	items-center">
          <button
            title="Like"
            className="like flex flex-nowrap  gap-2 items-center"
            onClick={handelLike}
          >
            <AiOutlineLike
              size={40}
              fill={loggedInUserReact.liked ? "blue" : "black"}
              className="hover:scale-95"
            />
            <span className="text-[18px]">{countFormatter(video.likes)}</span>
          </button>

          <button
            title="Dislike"
            className="dislike flex flex-nowrap items-center gap-2 "
            onClick={handleDislike}
          >
            <AiOutlineDislike
              size={40}
              fill={loggedInUserReact.disliked ? "red" : "black"}
              className="hover:scale-95"
            />
            <span className="text-[18px]">
              {countFormatter(video.dislikes)}
            </span>
          </button>
        </div>
        <button title="Share" className="share-btn">
          <Share className="w-8 h-8" />
        </button>

        <a
          type="button"
          title="Download"
          className="download-btn"
          href={video.videoUrl}
          download={video.title}
        >
          <Download className="w-8 h-8" />
        </a>
      </div>
      <div className="p-3 border-solid border-black border-[1px] rounded flex flex-col gap-2">
        <div className="text-md text-gray-600 font-medium">
          {video.viewsCount && video?.viewsCount?.toLocaleString("en-US")} views
          Sep 7, 2021
        </div>
        <div className="text-black-900">{video.description}</div>
        <div className="tags flex gap-4 flex-wrap">
          {video.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-800 text-pink-500 font-medium px-2 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoInfos;
