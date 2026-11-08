import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ReactComponent as UploadIcon } from "../../assets/upload.svg";
import { useSelector, useDispatch } from "react-redux";

// firebase imports
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { database } from "../../Config/firebaseConfig";
import useFileDrop from "./useFileDrop";
import {
  savVideoDetails,
  setUploaded,
  setUploadingProgress,
  setVideoUploading,
} from "../../store/video/video.action";

const DragDrop = () => {
  const videoToUpload = useSelector((state) => state.videoToUploadDetails);
  const appUser = useSelector((state) => state.appUser);

  // local state to store file and loading state
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);

  const dispatch = useDispatch();

  //set user that will upload video

  const selectFile = (fileToUpload) => {
    if (!fileToUpload) return;
    setLoading(true);
    setVideo(fileToUpload);
    dispatch(
      savVideoDetails({
        videoName: fileToUpload.name,
      })
    );
  };

  const handelChange = (e) => selectFile(e.target.files[0]);
  const { dragging, dropProps } = useFileDrop(selectFile, "video/");

  const handelSumbit = () => {
    //
    if (video !== null) {
      dispatch(
        savVideoDetails({
          userId: appUser.currentUser.id,
        })
      );
      dispatch(setVideoUploading());
      const databaseRef = ref(
        database,
        "videos/" + `${Date.now()}-${video.name}`
      );

      const uploadTask = uploadBytesResumable(databaseRef, video);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          dispatch(setUploadingProgress(progress * 100));
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //
            dispatch(
              savVideoDetails({
                videoURL: downloadURL,
              })
            );
            dispatch(setUploaded(true));
          });
        }
      );
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Upload a video</h1>
      <p className="mt-1 text-sm text-muted">
        Pick a file, upload it, then add the title, tags and thumbnail.
      </p>

      <label
        {...dropProps}
        className={
          "relative mt-6 flex h-44 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed px-4 text-center transition " +
          (dragging
            ? "scale-[1.02] border-brand bg-brand-soft"
            : video
            ? "border-brand bg-brand-soft"
            : "border-line bg-surface-sunken hover:border-brand")
        }
      >
        {!loading && (
          <>
            <UploadIcon style={{ width: "36px", height: "36px" }} />
            <span className="text-sm text-muted">
              <span className="font-semibold text-ink">
                {dragging ? "Release to upload" : "Drop a video here"}
              </span>{" "}
              or <span className="font-semibold text-brand">browse</span>
            </span>
            <input
              type="file"
              name="file_upload"
              className="sr-only"
              accept="video/*"
              onChange={(e) => handelChange(e)}
              required
            />
          </>
        )}
        {loading && (
          <>
            <ThreeDots
              height="40"
              width="60"
              radius="9"
              color="rgb(236 53 84)"
              ariaLabel="three-dots-loading"
              visible={loading}
            />
            {video?.name && (
              <p className="max-w-full truncate text-sm font-semibold">
                {video.name}
              </p>
            )}
          </>
        )}
      </label>

      <div className="mt-4">
        {!videoToUpload.isUploading ? (
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={handelSumbit}
            disabled={video === null}
          >
            Upload file
          </button>
        ) : (
          <div>
            <div className="mb-1 flex justify-between text-xs text-muted">
              <span>Uploading...</span>
              <span>{Math.floor(videoToUpload.progressUploading) + "%"}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: videoToUpload.progressUploading + "%" }}
                role="progressbar"
                aria-valuenow={Math.floor(videoToUpload.progressUploading)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-10">
        <img
          src="/images/uploadAn.gif"
          alt=""
          className="mx-auto max-h-72 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default DragDrop;
