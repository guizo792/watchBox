import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { MdShare, MdFileDownload } from "react-icons/md";
import { countFormatter } from "../../../utils/countFormatter";
import { dislikeVideo, likeVideo } from "../../../services/videoService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../../../store/user/user.action";
import { fetchVideoSuccess } from "../../../store/videosServices/videosServices.action";
import { getUser, updateUser } from "../../../services/userService";
import ButtonLoadingSpinner from "../../loadingSpinner/buttonSpinner/buttonSpinner";
import Toast from "../../Alert/Toast";
import Avatar from "../../Avatar/Avatar";
import Modal from "../../Modal/Modal";
import ConfirmDialog from "../../Modal/ConfirmDialog";


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
  const [copied, setCopied] = useState(false);
  const [showUnsub, setShowUnsub] = useState(false);

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
    if (appUser?.currentUser && video?.userId === appUser?.currentUser?.id) {
      setALert({
        show: true,
        msg: "You can't subscribe to yourself",
      });
    } else if (appUser?.currentUser && video.userId) {
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
        msg: "You can't subscribe, try again (you should be logged in) ⚠",
        show: true,
      });
  };

  const pill =
    "inline-flex items-center gap-2 rounded-full bg-surface-sunken px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-line";

  const copyLink = () => {
    navigator.clipboard.writeText(document.location.href).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => setALert({ show: true, msg: "Could not copy the link" })
    );
  };

  return (
    <div className="relative flex flex-col gap-4 py-4">
      <h1 className="text-xl font-bold leading-snug sm:text-2xl">
        {video.title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={videoUser?.profilePicture}
            name={videoUser?.username}
            className="h-11 w-11 text-base"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-semibold">
              {videoUser?.username || "No name"}
            </div>
            <div className="text-xs text-muted">
              {countFormatter(videoUser?.subscribers?.length || 0)} subscribers
            </div>
          </div>
          {subscribed ? (
            <button
              type="button"
              className="ml-2 rounded-full border border-line bg-surface-sunken px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-line"
              onClick={() => setShowUnsub(true)}
            >
              {subscribeLoading ? <ButtonLoadingSpinner /> : "Subscribed"}
            </button>
          ) : (
            <button
              type="button"
              className="ml-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
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

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex overflow-hidden rounded-full bg-surface-sunken">
            <button
              title="Like"
              aria-pressed={loggedInUserReact.liked}
              className={
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-line " +
                (loggedInUserReact.liked ? "text-brand" : "text-ink")
              }
              onClick={handelLike}
            >
              {loggedInUserReact.liked ? (
                <AiFillLike size={20} className="animate-pop" />
              ) : (
                <AiOutlineLike size={20} />
              )}
              {countFormatter(video.likes)}
            </button>
            <span className="my-2 w-px bg-line" aria-hidden="true" />
            <button
              title="Dislike"
              aria-pressed={loggedInUserReact.disliked}
              className={
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-line " +
                (loggedInUserReact.disliked ? "text-brand" : "text-ink")
              }
              onClick={handleDislike}
            >
              {loggedInUserReact.disliked ? (
                <AiFillDislike size={20} className="animate-pop" />
              ) : (
                <AiOutlineDislike size={20} />
              )}
              {countFormatter(video.dislikes)}
            </button>
          </div>

          <button
            title="Share"
            className={pill}
            onClick={() => setShowPopUp(true)}
          >
            <MdShare size={20} />
            <span className="hidden sm:inline">Share</span>
          </button>

          <a
            title="Download"
            className={pill}
            href={video.videoUrl}
            download={video.title}
          >
            <MdFileDownload size={20} />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      <div className="rounded-xl bg-surface-sunken p-4 text-sm">
        <div className="font-semibold">
          {video.viewsCount != null &&
            `${video.viewsCount.toLocaleString("en-US")} views`}
          {video.createdAt && (
            <span className="ml-2 font-normal text-muted">
              {video.createdAt}
            </span>
          )}
        </div>
        <p className="mt-2 whitespace-pre-line">
          {video.description || "No description"}
        </p>
        {video.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {video.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-brand-soft px-3 py-0.5 text-xs font-medium text-brand"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {alert.show && <Toast msg={alert.msg} show={setALert} />}

      <ConfirmDialog
        open={showUnsub}
        title="Unsubscribe?"
        message={`You will stop following ${
          videoUser?.username || "this channel"
        }.`}
        confirmLabel="Unsubscribe"
        danger
        onCancel={() => setShowUnsub(false)}
        onConfirm={() => {
          setShowUnsub(false);
          handleSubscription();
        }}
      />

      <Modal
        open={showPopUp}
        title="Share video"
        onClose={() => setShowPopUp(false)}
      >
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://twitter.com/share?url=${window.location}`}
            target="_blank"
            className="btn bg-[#1f7ec7] text-white hover:opacity-90"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location}`}
            target="_blank"
            className="btn bg-[#173981] text-white hover:opacity-90"
            rel="noreferrer"
          >
            Facebook
          </a>
          <button className="btn-secondary" title="copy link" onClick={copyLink}>
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default VideoInfos;
