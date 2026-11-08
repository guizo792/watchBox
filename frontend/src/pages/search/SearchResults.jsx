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
        //
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
      <div className="sticky top-16 z-30 w-full bg-surface/90 backdrop-blur sm:w-56 sm:shrink-0 sm:self-start">
        <SidebarNav />
      </div>
      <main className="min-w-0 flex-1 space-y-5 px-4 pb-12 pt-4 sm:pr-6">
        {videosFiltered?.map((video, index) => {
          return (
            <SearchResultsItem
              key={video?.id ?? index}
              title={video?.title}
              thumbline={video?.thumbnailUrl}
              desc={video?.description}
              views={video?.viewsCount}
              userId={video?.userId}
              videoId={video?.id}
            />
          );
        })}
      </main>
    </div>
  );
};

export default SearchResults;
