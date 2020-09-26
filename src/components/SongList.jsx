import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import MouseTooltip from "react-sticky-mouse-tooltip";
import { useSearchGenius } from "../hooks/useSearch";
import Song from "./Song";

function SongList({ search }) {
  const [finished, results] = useSearchGenius(search);
  const [tooltip, setTooltip] = useState(false);

  const tooltipStyle = {
    display: tooltip ? "block" : "none",
    background: "white",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "0.5em",
    zIndex: "3",
  };

  return (
    <div className="songs-list">
      {!finished ? (
        <ScaleLoader
          height="50px"
          width="6px"
          radius="6px"
          margin="3px"
          color="royalblue"
        />
      ) : (
        ""
      )}

      {results
        ? results.map((res) => (
            <Song track={res.result} setTooltip={setTooltip} />
          ))
        : ""}

      <MouseTooltip visible={tooltip} style={tooltipStyle} offsetY={10}>
        <span>Artist info</span>
      </MouseTooltip>
    </div>
  );
}

export default SongList;
