import React from "react";

import { VscSearch } from "react-icons/vsc";
import SearchSuggestions from "../navbar/SearchSuggestions";

const SearchBar = () => {
  return (
    <div className="relative">
      <form action="">
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
          />
        </div>
      </form>

      <SearchSuggestions />
    </div>
  );
};

export default SearchBar;
