import React from "react";
import Fade from "react-reveal/Fade";
import { CiSquareRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setSuggetions } from "../../store/search/search.action";
import { Link } from "react-router-dom";

function SearchSuggestions() {
  const search = useSelector((state) => state.search);

  //console.log(search?.searchKeyResult);
  const dispatch = useDispatch();

  return (
    <Fade top>
      <div className="absolute bg-gray-800 rounded-md max-w-3xl left-0 right-0 top-14">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-white text-lg font-bold tracking-wider ">
                Search suggestions
              </h1>
              <span className="block border-b-4 border-main w-16"></span>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => dispatch(setSuggetions(false))}
            >
              <CiSquareRemove size={30} color={"white"} />
            </button>
          </div>

          <div className="h-80 mt-4 px-4 text-white overflow-scroll scrollbar-hide">
            {search?.searchKeyResult.map((key, index) => {
              return <KeySearchResult keySearchResult={key} key={index} />;
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}

const KeySearchResult = ({ keySearchResult }) => {
  //
  const dispatch = useDispatch();

  return (
    <Link
      to={"/videos/find?key=" + keySearchResult}
      onClick={() => {
        dispatch(setSuggetions(false));
      }}
    >
      <p className="mb-2 h-11 text-lg rounded py-2 px-3 transition duration-300 ease-in-out shadow-sm bg-gray-600 hover:bg-main cursor-pointer overflow-hidden">
        {keySearchResult}
        <span className="font-bold text-2lg float-right">{">"}</span>
      </p>
    </Link>
  );
};

export default SearchSuggestions;
