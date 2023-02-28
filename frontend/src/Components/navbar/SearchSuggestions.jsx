import React from "react";
import Fade from "react-reveal/Fade";

function SearchSuggestions() {
  return (
    <Fade top>
      <div className="absolute bg-gray-800 rounded-md max-w-3xl left-0 right-0 top-14">
        <div className="px-4 py-4">
          <h1 className="text-white text-lg font-bold tracking-wider ">
            Search suggestions
          </h1>
          <span className="block border-b-4 border-main w-16"></span>

          <div className="mt-4 px-4 flex flex-col gap-2 text-white">
            <p className="text-lg rounded py-2 px-3 transition duration-300 ease-in-out shadow-sm bg-gray-600 hover:bg-main cursor-pointer">
              vlog london
              <span className="font-bold text-2lg float-right">{">"}</span>
            </p>
            <p className="text-lg rounded py-2 px-3 transition duration-300 ease-in-out shadow-sm bg-gray-600 hover:bg-main cursor-pointer">
              vlog london
              <span className="font-bold text-2lg float-right">{">"}</span>
            </p>
            <p className="text-lg rounded py-2 px-3 transition duration-300 ease-in-out shadow-sm bg-gray-600 hover:bg-main cursor-pointer">
              vlog london
              <span className="font-bold text-2lg float-right">{">"}</span>
            </p>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default SearchSuggestions;
