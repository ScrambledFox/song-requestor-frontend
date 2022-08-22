import React, { useState } from "react";

import isEmpty from "validator/lib/isEmpty";
import isURL from "validator/lib/isURL";
import trim from "validator/lib/trim";

import "../App.css";

const AddSongForm = () => {
  const [error, setError] = useState("");

  const [usingLink, setUsingLink] = useState(false);

  const onLinkChanged = (e) => {
    setUsingLink(!isEmpty(e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setError("");

    let title = trim(e.target.elements.title.value);
    let artist = trim(e.target.elements.artist.value);

    let link = trim(e.target.elements.youtube_link.value);

    if (usingLink) {
      // https://www.youtube.com/watch?v=gGdGFtwCNBE
      if (
        !isURL(link, { host_whitelist: ["www.youtube.com", "youtube.com"] })
      ) {
        console.log("Invalid Link");
        setError("Please enter a valid YouTube Link.");
        return;
      }

      fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtube_link: link,
        }),
      }).then(() => {
        e.target.submit();
      });
    } else {
      if (isEmpty(title)) {
        setError("Please enter a song title.");
        return;
      }

      if (isEmpty(artist)) {
        setError("Please enter an artist name.");
        return;
      }

      fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          artist: artist,
        }),
      }).then(() => {
        e.target.submit();
      });
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <div className="form-elements">
            <div className="centered" style={{ marginBottom: 20 }}>
              <i>
                Enter the song title and artist -- or -- enter a youtube link.
              </i>
            </div>

            <div className="centered">
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Song Title"
                disabled={usingLink}
              />
              by
              <input
                className="input"
                type="text"
                name="artist"
                placeholder="Artist Name"
                disabled={usingLink}
              />
            </div>

            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <p className="center-text">or</p>
              <hr className="divider-solid" />
            </div>

            <div style={{ marginBottom: 20 }}>
              <input
                className="input centered"
                style={{ width: 400 }}
                type="text"
                name="youtube_link"
                placeholder="YouTube Link"
                onChange={onLinkChanged}
              />
            </div>

            <div>
              {error !== "" && <p className="request-error">{error}</p>}
            </div>

            <div>
              <button className="btn centered">Request</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongForm;
