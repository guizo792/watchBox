import React from "react";
import Fade from "react-reveal/Fade";
import { CiSquareRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setSuggetions } from "../../store/search/search.action";
import { Link } from "react-router-dom";

function SearchSuggestions() {
  const search = useSelector((state) => state.search);

  const dispatch = useDispatch();

  return (
    <Fade top>
      <div className="absolute left-0 right-0 top-12 z-50 rounded-xl border border-line bg-surface shadow-card-hover">
        <div className="px-3 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-ink">
                Search suggestions
              </h1>
              <span className="mt-1 block h-0.5 w-10 rounded bg-brand"></span>
            </div>
            <button
              className="cursor-pointer rounded-full text-muted hover:text-ink"
              aria-label="Close suggestions"
              onClick={() => dispatch(setSuggetions(false))}
            >
              <CiSquareRemove size={26} />
            </button>
          </div>

          <div className="scrollbar-hide mt-3 max-h-80 overflow-y-auto text-ink">
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
      <p className="flex items-center justify-between truncate rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-soft hover:text-brand">
        {keySearchResult}
        <span aria-hidden="true" className="text-muted">
          {">"}
        </span>
      </p>
    </Link>
  );
};

export default SearchSuggestions;
