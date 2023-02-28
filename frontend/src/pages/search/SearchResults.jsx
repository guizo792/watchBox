import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchResultsItem from "../../Components/search/SearchResultsItem";
import SidebarNav from "../../Components/sidebarNav/sidebarNav";
import { filteredVideos } from "../../services/videoService";

const SearchResults = () => {
  const [videosFiltered, setVideosFiltered] = useState();

  const search = useSelector((state) => state.search);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      //
      try {
        const listVideos = await filteredVideos(search.searchKey);
        if (isMounted) setVideosFiltered(listVideos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <div className="flex gap-[20px] flex-wrap sm:flex-nowrap">
      <div className="sticky top-16 left-0 z-50  sm:h-[80vh]">
        <SidebarNav />
      </div>
      <div className="px-8 pt-4 border-l-2 border-gray-300 w-full">
        {videosFiltered?.map((video, index) => {
          return (
            <SearchResultsItem
              title={video?.title}
              thumbline={video?.thumbnailUrl}
              desc={video?.description}
              views={video?.views}
              userId={video?.userId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
