import React, { useEffect, useRef, useState } from "react";

import SongList from "./SongList";

import useAutoComplete from "../hooks/useAutoComplete";

function SearchBar() {
  const [songSearch, setSongSearch] = useState("");
  const [songSearched, setSongSearched] = useState("");
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const suggestionsRef = useRef(null);

  const [suggestions, setSuggestions] = useAutoComplete(songSearch);

  const formSubmit = (e) => {
    e.preventDefault();
    setSongSearched(songSearch);
    setDisplaySuggestions(false);
  };

  // HIDE SUGGESTIONS LIST ON OUTSIDE CLICK ***************************************
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSuggestions);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSuggestions);
    };
  }, []);

  const handleClickOutsideSuggestions = (e) => {
    const { current: list } = suggestionsRef;
    if (list && !list.contains(e.target)) {
      setDisplaySuggestions(false);
    }
  };
  // HIDE SUGGESTIONS LIST ON OUTSIDE CLICK ***************************************

  return (
    <div className="search-bar-container">
      <form
        autoComplete="off"
        className="search-bar-form"
        onSubmit={formSubmit}
      >
        <div className="suggestions-wrapper">
          <label className="search-label">Search</label>
          <input
            type="text"
            name="search"
            className="search-bar-input"
            placeholder="Artist name"
            value={songSearch}
            onFocus={() => {
              setDisplaySuggestions(true);
            }}
            onChange={(e) => {
              setDisplaySuggestions(true);
              setSongSearch(e.target.value);
            }}
          />
          {displaySuggestions && (
            <div ref={suggestionsRef} className="suggestions-list">
              {suggestions
                ? suggestions.map((result, index) => (
                    <li
                      className="suggestion"
                      key={index}
                      onClick={(e) => {
                        setSongSearch(e.target.textContent);
                        setSuggestions([]);
                      }}
                    >
                      {result.term}
                    </li>
                  ))
                : ""}
            </div>
          )}
        </div>
        <div className="btn-wrap">
          <button type="submit" className="search-bar-submit-btn">
            Search
          </button>
        </div>
      </form>
      {songSearched && <SongList search={songSearched} />}
    </div>
  );
}

export default SearchBar;
