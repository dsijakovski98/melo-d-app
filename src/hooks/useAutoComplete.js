import axios from "axios";
import { headers as shazamHeaders, autoCompleteLink } from "../apis/Shazam";
import { useEffect, useState } from "react";

const useAutoComplete = (value) => {
  const [results, setResults] = useState();

  useEffect(() => {
    const query = {
      locale: "en-US",
      term: value,
    };

    if (value === "") {
      setResults([]);
      return;
    }

    axios({
      method: "GET",
      url: autoCompleteLink,
      headers: shazamHeaders,
      params: query,
    })
      .then((response) => {
        if (response && response.data) {
          setResults(response.data.hints);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);

  return [results, setResults];
};

export default useAutoComplete;
