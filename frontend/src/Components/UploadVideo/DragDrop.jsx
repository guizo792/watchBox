import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ReactComponent as UploadIcon } from "../../assets/upload.svg";
import { useSelector, useDispatch } from "react-redux";

// firebase imports
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { database } from "../../Config/firebaseConfig";
import {
  savVideoDetails,
  setUploaded,
  setUploadingProgress,
  setVideoUploading,
} from "../../store/video/video.action";

const DragDrop = () => {
  const videoToUpload = useSelector((state) => state.videoToUploadDetails);

  // local state to store file and loading state
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");

  const dispatch = useDispatch();

  const handelChange = (e) => {
    //
    const fileToUpload = e.target.files[0];
    setLoading((prevLoading) => !loading);
    setVideo(fileToUpload);
    dispatch(
      savVideoDetails({
        videoName: fileToUpload.name,
      })
    );
  };

  const handelSumbit = () => {
    //
    dispatch(setVideoUploading());

    const databaseRef = ref(
      database,
      "videos/" + `${Date.now()}-${videoToUpload.videoName}`
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
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <label className="relative flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-800 focus:outline-none overflow-hidden">
        {!loading && (
          <>
            <span className="flex items-center space-x-2">
              <UploadIcon />
              <span className="font-medium text-gray-600">
                Drop files to Attach, or
                <span className="text-blue-600 underline">browse</span>
              </span>
            </span>
            <input
              type="file"
              name="file_upload"
              className="hidden"
              accept="video/*"
              onChange={(e) => handelChange(e)}
            />
          </>
        )}
        <span className=" absolute w-40 top-5">
          <ThreeDots
            height="90"
            width="80"
            radius="9"
            color="rgb(236 53 84)"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ margin: "auto 0" }}
            visible={loading}
          />
          {video.name && (
            <span className="absolute top-0">
              <p
                className="text-lg font-medium text-gray-800
             tracking-wider"
              >
                {video.name}
              </p>
            </span>
          )}
        </span>
      </label>
      <div className="mt-4 ">
        {!videoToUpload.isUploading ? (
          <button
            className="block bg-green-600 w-20 col-span-1 rounded shadow-2xl text-sm font-semibold text-white transition duration-500 ease-in-out py-2 hover:shadow-2xl"
            onClick={handelSumbit}
          >
            Upload file
          </button>
        ) : (
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-800 mt-2">
            <div
              className="bg-main text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition ease-in-out duration-500 "
              style={{ width: videoToUpload.progressUploading }}
            >
              {videoToUpload.progressUploading.split(".")[0]}
            </div>
          </div>
        )}
      </div>
      <div className="mt-8">
        <img
          src="./images/uploadAn.gif"
          alt="video-illustration"
          className="max-h-80 mx-auto"
        />
      </div>
    </div>
  );
};

export default DragDrop;
