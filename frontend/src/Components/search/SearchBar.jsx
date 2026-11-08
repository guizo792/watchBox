import React, { useEffect, useRef } from "react";

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
  const inputRef = useRef(null);

  // Press "/" anywhere (outside a text field) to jump to search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (
        t instanceof HTMLElement &&
        (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
      )
        return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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
            ref={inputRef}
            className="peer h-10 w-full rounded-full border border-line bg-surface-sunken pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/20"
            id="search"
            name="search"
            placeholder="Search videos"
            onChange={(e) => handelChange(e)}
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-line bg-surface px-1.5 text-[11px] text-muted sm:block peer-focus:hidden">
            /
          </kbd>
        </div>
      </form>

      {search?.showSuggetions && <SearchSuggestions />}
    </div>
  );
};

export default SearchBar;
