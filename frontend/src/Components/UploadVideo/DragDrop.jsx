import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

// firebase imports
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

import { database } from "../../Config/firebaseConfig";

const DragDrop = () => {
  const [loading, setLoading] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [videoURL, setVideoURL] = useState(null);

  const handelChange = (e) => {
    //
    const fileToUpload = e.target.files[0];
    setLoading((prevLoading) => !loading);
    setVideoName(fileToUpload.name);

    const databaseRef = ref(
      database,
      "videos/" + `${Date.now()}-${fileToUpload.name}`
    );

    const uploadTask = uploadBytesResumable(databaseRef, fileToUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //
          setVideoURL(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  return (
    <div class="max-w-xl mx-auto mt-12">
      <label class="relative flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-800 focus:outline-none ">
        {!loading && (
          <>
            <span class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span class="font-medium text-gray-600">
                Drop files to Attach, or
                <span class="text-blue-600 underline">browse</span>
              </span>
            </span>
            <input
              type="file"
              name="file_upload"
              class="hidden"
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
          {videoName && (
            <span className="absolute top-0">
              <p
                className="text-lg font-medium text-gray-800
             tracking-wider"
              >
                {videoName}
              </p>
            </span>
          )}
        </span>
      </label>
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
