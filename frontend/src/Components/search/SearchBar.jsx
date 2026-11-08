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
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <VscSearch size={18} />
          </span>
          <input
            type="text"
            className="h-10 w-full rounded-full border border-line bg-surface-sunken pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
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
