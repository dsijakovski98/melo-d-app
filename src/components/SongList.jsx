import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import MouseTooltip from "react-sticky-mouse-tooltip";
import { useSearchGenius } from "../hooks/useSearch";

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
        ? results.map((res) => {
            const track = res.result;
            // console.log(track);
            return (
              <div className="song-card" key={track.id}>
                <div className="song-img">
                  <a
                    onMouseOver={() => setTooltip(true)}
                    onMouseOut={() => setTooltip(false)}
                    href={track.primary_artist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={track.header_image_url} alt="" />
                  </a>
                </div>
                <div className="song-info">
                  <div className="song-info-text">
                    <h2>{track.title}</h2>
                    <p>{track.full_title}</p>
                  </div>
                  <div className="get-info-btn">
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button>Lyrics</button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
      <MouseTooltip visible={tooltip} style={tooltipStyle} offsetY={10}>
        <span>Artist info</span>
      </MouseTooltip>
    </div>
  );
}

export default SongList;
