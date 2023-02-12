import React, { useRef, useState } from "react";
import { ReactComponent as Shape } from "../../assets/shape1.svg";
import { ReactComponent as UploadIcon } from "../../assets/upload.svg";
import { GrFormClose } from "react-icons/gr";
import Fade from "react-reveal/Fade";

//firebase imports

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { database } from "../../Config/firebaseConfig";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { savVideoDetails, setUploaded } from "../../store/video/video.action";
import { ThreeDots } from "react-loader-spinner";
import { createVideo } from "../../services/videoServices";

const VideoDetails = ({ video }) => {
  // video to upload state
  const videoToUpload = useSelector((state) => state.videoToUploadDetails);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  //
  const tagRef = useRef();

  const addTag = () => {
    const tagValue = tagRef.current?.value;
    if (tagValue !== "") {
      tagRef.current.value = "";
      setTags((prevTags) => [...prevTags, tagValue]);
      dispatch(
        savVideoDetails({
          tags: [...tags, tagValue],
        })
      );
    }
  };

  //
  const handelChange = (e, isSelect) => {
    //

    dispatch(
      savVideoDetails({
        [e.target.name]: e.target.value,
      })
    );

    console.log(videoToUpload.videoDetails);
  };

  const handleSavingVideoDetails = async (event) => {
    event.preventDefault();

    if (!videoToUpload.videoDetails) {
      throw new Error("Please try again 💥");
    }

    console.log(videoToUpload);
    await createVideo(videoToUpload.videoDetails);
    dispatch(setUploaded(true));
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
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              onChange={(e) => handelChange(e, false)}
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
              onChange={(e) => handelChange(e, false)}
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
              name="videoStatus"
              onChange={(e) => handelChange(e, true)}
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
              {tags?.map((tag, index) => {
                return (
                  <Fade top key={index}>
                    <Tag
                      title={tag}
                      index={index}
                      setTags={setTags}
                      tags={tags}
                    />
                  </Fade>
                );
              })}
            </div>
          </div>

          <InputImage />

          {/* btn submit  */}
          <button
            className="mt-5 bg-main px-4 py-2 col-span-1 rounded shadow-md text-sm font-semibold text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
            onClick={(e) => handleSavingVideoDetails(e)}
          >
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
const Tag = ({ title, index, setTags, tags }) => {
  const dispatch = useDispatch();

  //
  const deleteTag = () => {
    setTags((prevTags) => {
      return prevTags.filter((tag, position) => index !== position);
    });
    dispatch(
      savVideoDetails({
        tags: tags,
      })
    );
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
  const videoToUpload = useSelector((state) => state.videoToUploadDetails);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  //
  const dispatch = useDispatch();

  //
  const imageRef = useRef();
  const handelChange = (e) => {
    //
    setLoading(true);
  };

  const handelUpload = () => {
    const databaseRef = ref(
      database,
      "images/" + `${Date.now()}-${imageRef.current?.files[0].name}`
    );

    const uploadTask = uploadBytesResumable(
      databaseRef,
      imageRef.current?.files[0]
    );

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

          setUploaded(true);
          dispatch(
            savVideoDetails({
              thumbnailUrl: downloadURL,
            })
          );
        });
      }
    );
  };

  return (
    <>
      <div className="mb-4">
        <label
          className="block text-gray-800 text-sm font-semibold mb-2"
          htmlFor="thumbnail"
        >
          Video thumhnail image
        </label>
        <div className="grid grid-cols-4 gap-8 items-center">
          {uploaded ? (
            <div className="mt-4 col-span-4">
              <img
                src={videoToUpload.videoDetails?.thumbnailUrl}
                alt=""
                className="rounded-lg h-72"
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center col-span-3">
                <label
                  htmlFor="thmblineImage"
                  className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:border-gray-600 shadow appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                >
                  <div className="flex flex-col items-center justify-center ">
                    {!loading ? (
                      <>
                        <UploadIcon style={{ width: "35px", height: "35px" }} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                      </>
                    ) : (
                      <ThreeDots />
                    )}
                  </div>
                  <input
                    id="thmblineImage"
                    name="thumbnailUrl"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handelChange(e)}
                    ref={imageRef}
                  />
                </label>
              </div>
              <button
                type="button"
                className="bg-green-400 w-30 h-10 col-span-1 rounded shadow-2xl text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-600"
                onClick={handelUpload}
              >
                upload photo
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
