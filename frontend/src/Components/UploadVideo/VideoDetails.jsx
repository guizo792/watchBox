import React, { useRef, useState } from "react";

import { ReactComponent as Shape } from "../../assets/shape1.svg";
import { ReactComponent as UploadIcon } from "../../assets/upload.svg";
import { GrFormClose } from "react-icons/gr";
import Fade from "react-reveal/Fade";

// redux imports
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  tags: [],
};

const VideoDetails = ({ video }) => {
  // video to upload state
  const videoToUpload = useSelector((state) => state.videoToUploadDetails);

  console.log(videoToUpload.videoDetails);

  //
  const tagRef = useRef();

  const addTag = () => {
    const tagValue = tagRef.current?.value;
    if (tagValue !== "") {
      tagRef.current.value = "";
      // setVideoDetails((prevDetails) => {
      //   return {
      //     ...prevDetails,
      //     tags: [...prevDetails.tags, tagValue],
      //   };
      // });
    }
  };

  return (
    <div className=" mt-8 grid grid-cols-2 max-w-6xl mx-auto gap-8 items-start mb-8">
      <div className="col-span-1">
        {/* details */}
        <h2 className=" mt-2 font-bold text-lg tracking-wide mb-4">
          Add video details
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="Title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              type="text"
              placeholder="video description"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="videoStatus"
            >
              Video status
            </label>
            <select
              className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              name="status"
            >
              <option selected disabled>
                choose video status
              </option>
              <option value="public">public</option>
              <option value="private">private</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="tags"
            >
              Video tags
            </label>
            <div className="grid grid-cols-4 gap-8">
              <input
                className="col-span-3 shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tags"
                name="tags"
                type="text"
                placeholder="video tags"
                ref={tagRef}
              />
              <button
                type="button"
                className="mx-auto bg-green-400 w-20 col-span-1 rounded shadow-2xl text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-600"
                onClick={addTag}
              >
                add tag
              </button>
            </div>
            <div className=" flex mt-4 gap-4 flex-wrap px-8 justify-center">
              {videoToUpload.videoDetails.videoTags?.map((tag, index) => {
                return (
                  <Fade top>
                    <Tag title={tag} key={index} index={index} />
                  </Fade>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="thumbline"
            >
              Video thumbline
            </label>
            <div className="grid grid-cols-4 gap-8 items-center">
              <div className="flex items-center justify-center col-span-3">
                <InputImage />
              </div>
              <button
                type="button"
                className="bg-green-400 w-30 h-10 col-span-1 rounded shadow-2xl text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-600"
              >
                upload photo
              </button>
            </div>
          </div>

          {/* btn submit  */}
          <button className="mt-5 bg-main px-4 py-2 col-span-1 rounded shadow-md text-sm font-semibold text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl">
            Save Details
          </button>
        </form>
      </div>
      <div className="col-span-1 pl-20 mt-8 relative max-h-fit">
        {/*  */}
        <video className="max-h-56 rounded-lg" controls>
          <source src={videoToUpload.videoDetails?.videoURL} />
        </video>

        <div
          className="absolute -z-10 left-0 right-0 max-h-48 object-contain opacity-60"
          style={{ top: "-7rem" }}
        >
          <Shape />
        </div>
      </div>
    </div>
  );
};

// define tag componenet
const Tag = ({ title, setVideoDetails, index }) => {
  const deleteTag = () => {
    setVideoDetails((prevDetails) => {
      return {
        ...prevDetails,
        tags: prevDetails.tags.filter((tag, position) => index !== position),
      };
    });
  };
  return (
    <div className="px-1 rounded-lg text-xs font-semibold shadow-md text-white bg-gray-800 flex gap-2 items-center py-1">
      <p className="uppercase">{title}</p>
      <span
        className="inline-block rounded-full bg-main cursor-pointer"
        onClick={deleteTag}
      >
        <GrFormClose size={22} />
      </span>
    </div>
  );
};

const InputImage = () => {
  return (
    <label
      for="thmblineImage"
      className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:border-gray-600 shadow appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
    >
      <div className="flex flex-col items-center justify-center ">
        <UploadIcon style={{ width: "35px", height: "35px" }} />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
      </div>
      <input
        id="thmblineImage"
        type="file"
        accept="image/*"
        className="hidden"
      />
    </label>
  );
};

export default VideoDetails;
