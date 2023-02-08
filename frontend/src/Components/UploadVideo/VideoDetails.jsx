import React from "react";

const VideoDetails = ({ video }) => {
  return (
    <div className="flex mt-8 justify-around">
      <div className="">
        {/* details */}
        <h2 className=" mt-2 font-bold">Add video details</h2>
        <form>
          <div class="mb-4">
            <label
              class="block text-gray-800 text-sm font-bold mb-2"
              for="Title"
            >
              Title
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Title"
              type="text"
              placeholder="Title"
            />
          </div>
        </form>
      </div>
      <div className="">
        {/*  */}
        {/* <video className="max-h-96">
          <source src="./images/vid.mp4" />
        </video> */}
      </div>
    </div>
  );
};

export default VideoDetails;
