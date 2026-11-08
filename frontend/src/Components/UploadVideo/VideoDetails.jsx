import React, { useRef, useState } from "react";
import { ReactComponent as UploadIcon } from "../../assets/upload.svg";
import { MdClose } from "react-icons/md";
import Fade from "react-reveal/Fade";

//firebase imports

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { database } from "../../Config/firebaseConfig";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  savVideoDetails,
  setUploaded,
  setUploadingProgress,
  setVideoUploading,
} from "../../store/video/video.action";
import { ThreeDots } from "react-loader-spinner";
import { createVideo } from "../../services/videoService";

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
  };

  const handleSavingVideoDetails = async (event) => {
    event.preventDefault();

    if (!videoToUpload.videoDetails) {
      throw new Error("Please try again 💥");
    }

    const res = await createVideo(videoToUpload.videoDetails);
    if (res.status === 201) {
      dispatch(setUploaded(false));
      dispatch(setUploadingProgress(0));
      dispatch(setVideoUploading());
      videoToUpload.videoDetails = {};
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-10 lg:grid-cols-2">
      <div>
        {/* details */}
        <h1 className="text-2xl font-bold tracking-tight">Video details</h1>
        <p className="mt-1 text-sm text-muted">
          Tell viewers what your video is about.
        </p>
        <form className="mt-6 space-y-5">
          <div>
            <label className="field-label" htmlFor="title">
              Title
            </label>
            <input
              className="field"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              onChange={(e) => handelChange(e, false)}
              required
            />
          </div>
          <div>
            <label className="field-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="field min-h-[7rem] resize-y"
              id="description"
              name="description"
              onChange={(e) => handelChange(e, false)}
              placeholder="video description"
              required
            />
          </div>
          <div>
            <label className="field-label" htmlFor="status">
              Video status
            </label>
            <select
              className="field"
              id="status"
              name="videoStatus"
              defaultValue=""
              onChange={(e) => handelChange(e, true)}
              required
            >
              <option value="" disabled>
                choose video status
              </option>
              <option value="public">public</option>
              <option value="private">private</option>
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="tags">
              Video tags
            </label>
            <div className="flex gap-2">
              <input
                className="field"
                id="tags"
                name="tags"
                type="text"
                placeholder="video tags"
                ref={tagRef}
                required
              />
              <button
                type="button"
                className="btn-secondary shrink-0"
                onClick={addTag}
              >
                Add tag
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
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
            type="button"
            className="btn-primary"
            onClick={(e) => handleSavingVideoDetails(e)}
          >
            Save details
          </button>
        </form>
      </div>
      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-2xl bg-black shadow-card">
          <video className="aspect-video w-full" controls>
            <source src={videoToUpload.videoDetails?.videoURL} />
          </video>
        </div>
        <p className="mt-2 truncate text-sm text-muted">
          {videoToUpload.videoDetails?.videoName}
        </p>
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
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft py-1 pl-3 pr-1 text-xs font-semibold text-brand">
      {title}
      <button
        type="button"
        className="rounded-full p-0.5 hover:bg-brand hover:text-white"
        aria-label={`Remove tag ${title}`}
        onClick={deleteTag}
      >
        <MdClose size={14} />
      </button>
    </span>
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
    <div>
      <label className="field-label" htmlFor="thmblineImage">
        Video thumbnail image
      </label>
      {uploaded ? (
        <img
          src={videoToUpload.videoDetails?.thumbnailUrl}
          alt="Chosen thumbnail"
          className="aspect-video w-full max-w-sm rounded-xl object-cover shadow-card"
        />
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <label
            htmlFor="thmblineImage"
            className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-line bg-surface-sunken px-3 py-5 text-center transition-colors hover:border-brand"
          >
            {!loading ? (
              <>
                <UploadIcon style={{ width: "32px", height: "32px" }} />
                <p className="text-sm text-muted">
                  <span className="font-semibold text-ink">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
              </>
            ) : (
              <ThreeDots color="rgb(236 53 84)" height="40" width="50" />
            )}
            <input
              id="thmblineImage"
              name="thumbnailUrl"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handelChange(e)}
              ref={imageRef}
            />
          </label>
          <button
            type="button"
            className="btn-secondary sm:self-stretch"
            onClick={handelUpload}
          >
            Upload photo
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
