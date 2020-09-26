import React from "react";

function Song({ track, setTooltip }) {
  //   console.log(track);
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
          <a href={track.url} target="_blank" rel="noopener noreferrer">
            <button>Lyrics</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Song;
