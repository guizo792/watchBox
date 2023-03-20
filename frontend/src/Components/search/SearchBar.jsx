import React, { useEffect } from "react";

import { VscSearch } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import SearchSuggestions from "./SearchSuggestions";

import {
  setSearchKey,
  setSearchKeyResults,
  setSuggetions,
} from "../../store/search/search.action";
import { searchVideos } from "../../services/videoService";
const SearchBar = () => {
  const search = useSelector((state) => state.search);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSearch() {
      try {
        const keySearchResult = await searchVideos(search.searchKey);
        dispatch(setSearchKeyResults(keySearchResult));
      } catch (error) {
        console.log(error);
      }
    }

    let timer = setTimeout(() => {
      if (search?.searchKey?.length > 0) fetchSearch();
      console.log("....hello");
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search.searchKey, dispatch]);

  const handelChange = (e) => {
    //
    dispatch(setSearchKey(e.target.value));
    dispatch(setSuggetions(true));
    //
  };

  return (
    <div className="relative">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search" className="sr-only">
          search
        </label>
        <div className="relative">
          <span className="absolute left-1 top-3">
            <VscSearch size={20} color={"white"} />
          </span>
          <input
            type="text"
            className="h-9 w-full text-white  pr-4 font-thin pl-8 rounded-md outline-none bg-gray-600  focus:border-2 focus:bg-gray-700 focus:border-main"
            id="search"
            name="search"
            placeholder="Search videos"
            onChange={(e) => handelChange(e)}
          />
        </div>
      </form>

      {search?.showSuggetions && <SearchSuggestions />}
    </div>
  );
};

export default SearchBar;
