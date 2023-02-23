import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { ReactComponent as Share } from "../../../assets/share.svg";
import { ReactComponent as Download } from "../../../assets/download.svg";
import { countFormatter } from "../../../utils/countFormatter";
import { dislikeVideo, likeVideo } from "../../../services/videoService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../../../store/user/user.action";
import { fetchVideoSuccess } from "../../../store/videosServices/videosServices.action";
import { getUser, updateUser } from "../../../services/userService";
import ButtonLoadingSpinner from "../../loadingSpinner/buttonSpinner/buttonSpinner";
import Alert from "../../Alert/Alert";

import "./videoInfosStyles.css";

const VideoInfos = ({ video }) => {
  // console.log(video);
  const appUser = useSelector((state) => state.appUser);

  const [loggedInUserReact, setUserReact] = useState({
    liked: false,
    disliked: false,
  });
  const [videoUser, setVideoUser] = useState(null);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [alert, setALert] = useState({
    show: false,
    msg: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const isLikedVideosContainVideo = () => {
      let isLikeChnaged = false;
      let isDislikedChnaged = false;
      appUser?.currentUser?.likedVideos?.forEach((element) => {
        if (element === video.id) {
          isLikeChnaged = true;
          setUserReact({
            disliked: false,
            liked: true,
          });
        }
      });

      appUser?.currentUser?.dislikedVideos?.forEach((element) => {
        if (element === video.id) {
          isDislikedChnaged = true;
          setUserReact({
            liked: false,
            disliked: true,
          });
        }
      });

      if (!isLikeChnaged) {
        setUserReact((prevReact) => {
          return {
            ...prevReact,
            liked: false,
          };
        });
      }
      if (!isDislikedChnaged) {
        setUserReact((prevReact) => {
          return {
            ...prevReact,
            disliked: false,
          };
        });
      }
    };

    isLikedVideosContainVideo();

    // Get and set the video user state
    if (video.userId) {
      getUser(video.userId).then((res) => {
        setVideoUser(res);
      });
    }

    // Check if the appuser is subscribed to video channel
    if (video?.userId)
      getUser(video?.userId).then((res) => {
        if (res?.subscribers?.includes(appUser?.currentUser.id)) {
          setSubscribed(true);
        }
      });
  }, [video, appUser?.currentUser, subscribed]);

  const handelLike = async () => {
    //
    if (!appUser.isLoggedIn) {
      setALert({
        show: true,
        msg: "You must be logged in to perform this action",
      });
      // alert("You must be logged in to perform this action");
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
      setALert({
        show: true,
        msg: "You must be logged in to perform this action",
      });
      // alert("You must be logged in to perform this action");
    } else {
      const { userAfterDislike, videoAfterDislike } = await dislikeVideo(
        video,
        appUser.currentUser
      );

      dispatch(setUser(userAfterDislike));
      dispatch(fetchVideoSuccess(videoAfterDislike));
    }
  };

  const handleSubscription = () => {
    if (video?.userId === appUser?.currentUser?.id) {
      setALert({
        show: true,
        msg: "You can't subscribe to yourself",
      });
    } else if (video.userId) {
      setSubscribeLoading(true);
      updateUser(appUser.currentUser.id, {
        subscribedToUsers: [video.userId],
      }).then((res) => {
        updateUser(video.userId, {
          subscribers: [appUser.currentUser.id],
        }).then((res) => {
          setSubscribeLoading(false);
          setSubscribed(!subscribed);
        });
      });
    } else
      setALert({
        msg: "This video has no user id to subscribe to ⚠",
        show: true,
      });
  };

  return (
    <div className="video-infos-container flex flex-col gap-y-5 py-3 px-5 relative">
      <div className="title font-medium text-xl	">{video.title}</div>
      <div className="other-infos flex gap-5 items-center justify-around basis-1 flex-wrap">
        <div className="channel flex gap-5 flex-nowrap items-center">
          <div className="channel-img ">
            <img
              src={`${
                videoUser?.profilePicture || "/images/defaultProfile.jpg"
              }`}
              alt="channel"
              className="w-14 h-14 rounded-full border-[3px] border-pink-700 border-solid"
            />
          </div>
          <div className="flex flex-col justify-around">
            <div className="channel-name font-medium text-[16px]">
              {videoUser?.username || "No name"}
            </div>
            <div className="channel-subscribers text-[16px]">
              {countFormatter(videoUser?.subscribers?.length || 0)} subs
            </div>
          </div>
        </div>
        <div className="subscribe-btn">
          {subscribed ? (
            <button
              type="button"
              className=" focus:outline-none border-solid border-2 border-[#C2C2C2] text-gray-800 bg-[#C2C2C255] hover:bg-gray-800 focus:ring-[1px] focus:ring-gray-300 rounded-lg px-3 py-1 dark:bg-gray-[#C2C2C255] dark:hover:bg-[#C2C2C2] dark:focus:ring-[#ADADAD] text-[20px]"
              onClick={() => {
                if (window.confirm("Are you sure you want to unsubsribe 🛑"))
                  handleSubscription();
              }}
            >
              {subscribeLoading ? <ButtonLoadingSpinner /> : "Subscribed"}
            </button>
          ) : (
            <button
              type="button"
              className=" focus:outline-none text-white bg-pink-700 hover:bg-pink-800 focus:ring-[1px] focus:ring-pink-300 rounded-lg px-3 py-1 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900 text-[20px]"
              onClick={handleSubscription}
            >
              {subscribeLoading ? (
                <ButtonLoadingSpinner styles={"height: '20px !important'"} />
              ) : (
                "Subscribe"
              )}
            </button>
          )}
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
        <button
          title="Share"
          className=""
          onClick={() => {
            setShowPopUp(true);
          }}
        >
          <Share className="w-9 h-9" />
        </button>

        <a
          type="button"
          title="Download"
          className="download-btn"
          href={video.videoUrl}
          download={video.title}
        >
          <Download className="w-9 h-9" />
        </a>
      </div>
      <div className="p-3 border-solid border-black border-[1px] rounded flex flex-col gap-2">
        <div className="text-md text-gray-600 font-medium">
          {video.viewsCount && video?.viewsCount?.toLocaleString("en-US")} views
          {video.createdAt}
        </div>
        <div className="text-black-900">
          {video.description || "No description"}
        </div>
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
      {alert.show && (
        <span className="absolute top-[2%] left-1/4 right-0 z-40">
          <Alert msg={alert.msg} show={setALert} />
        </span>
      )}

      {showPopUp && (
        <div className={"popup border border-2 border-black"}>
          <h2>Share video</h2>
          <span className={"close"} onClick={() => setShowPopUp(false)}>
            &times;
          </span>
          <a
            href={`https://twitter.com/share?url=${window.location}`}
            target="_blank"
            class="share-btn twitter"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a
            href={`https://twitter.com/share?url=${window.location}`}
            target="_blank"
            class="share-btn facebook"
            rel="noreferrer"
          >
            Facebook
          </a>
          <button
            className="share-btn copy"
            title="copy link"
            onClick={() => {
              let url = document.location.href;
              navigator.clipboard.writeText(url).then(
                function () {
                  window.alert("Copied!");
                },
                function () {
                  window.alert("Copy error");
                }
              );
            }}
          >
            Copy link
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoInfos;
