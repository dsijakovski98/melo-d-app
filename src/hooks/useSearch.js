import { useEffect, useState } from "react";
import axios from "axios";
import {
  headers as shazamHeaders,
  searchLink as shazamSearchLink,
} from "../apis/Shazam";
import {
  headers as geniusHeaders,
  searchLink as geniusSearchLink,
} from "../apis/Genius";

const useSearchShazam = (search) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const query = {
      locale: "en-US",
      offset: "0",
      limit: 5,
      term: search,
    };

    axios({
      method: "GET",
      url: shazamSearchLink,
      headers: shazamHeaders,
      params: query,
    }).then((response) => {
      if (response.data) {
        setResults(response.data.tracks.hits);
      }
    });
  }, [search]);

  return results;
};

const useSearchGenius = (search) => {
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: geniusSearchLink,
      headers: geniusHeaders,
      params: {
        q: search,
      },
    }).then((response) => {
      if (response.data) {
        setResults(response.data.response.hits);
        setFinished(true);
      }
    });
  }, [search]);
  return [finished, results];
};

export { useSearchShazam, useSearchGenius };
