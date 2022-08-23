import React, { useState, useEffect } from "react";

import isEmpty from "validator/lib/isEmpty";
import isURL from "validator/lib/isURL";
import trim from "validator/lib/trim";

import axios from "axios";

import "../App.css";

const AddSongForm = () => {
  const [error, setError] = useState("");
  const [usingLink, setUsingLink] = useState(false);

  const [IP, setIP] = useState("unknown");

  const onLinkChanged = (e) => {
    setUsingLink(!isEmpty(e.target.value));
  };

  // Get user IP.
  useEffect(() => {
    LoadOrigin();
  }, []);

  const LoadOrigin = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
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

      fetch(process.env.REACT_APP_BACKEND_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtube_link: link,
          origin: IP,
        }),
      })
        .then((res) => {
          if (res.status == 200) e.target.submit();
          if (res.status == 409) setError("This video has already been added!");

          return;
        })
        .catch((res) => {
          console.error(res.statusMessage);
          return;
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

      fetch(process.env.REACT_APP_BACKEND_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          artist: artist,
          origin: IP,
        }),
      })
        .then((res) => {
          if (res.status == 200) e.target.submit();
          if (res.status == 409) setError("This video has already been added!");

          return;
        })
        .catch((res) => {
          console.error(res.statusMessage);
          return;
        });
    }
  };

  return (
    <div className="modal-content">
      <form onSubmit={onSubmit}>
        <div className="form-elements">
          <div>
            <p>
              <i>
                Enter the song title and artist -- or -- enter a youtube link.
              </i>
            </p>
          </div>

          <div>
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Song Title"
              disabled={usingLink}
            />

            <span style={{ display: "inline-block", margin: 10 }}>by</span>

            <input
              className="input"
              type="text"
              name="artist"
              placeholder="Artist Name"
              disabled={usingLink}
            />
          </div>
          {usingLink && (
            <i>
              Remove link to be able to enter a song name and artist instead.
            </i>
          )}
          <p className="center-text">or</p>
          <hr className="divider-solid" />
          <input
            className="input centered"
            type="text"
            name="youtube_link"
            placeholder="YouTube Link"
            onChange={onLinkChanged}
          />
          {error !== "" && <p className="request-error">{error}</p>}
          <button className="btn centered">Request</button>
        </div>
      </form>
    </div>
  );
};

export default AddSongForm;
