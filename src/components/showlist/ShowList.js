import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './showlist.css';

function ShowList() {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  const handleViewSummary = (showId) => {
    navigate(`/show/${showId}`);
  };

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => setShows(response.data))
      .catch((error) => console.log(error));
  }, []);

  const stripTags = (str) => {
    if (typeof str === "string") {
      return str.replace(/<[^>]*>/g, "");
    } else {
      return "";
    }
  };

  return (
    <>
    <h1>ShowLists</h1>
    <div className="wrap">
      
      {shows.map((show) => (
        <div key={show.show.id} className="box">
          <div className="box-top">
            <img
              className="box-image"
              src={show.show.image?.medium}
              alt={show.show.name}
            />
            <div className="title-flex">
              <h3 className="box-title">{show.show.name}</h3>
              <p className="user-follow-info">
                {show.show.externals?.imdb ? (
                  <a
                    href={`https://www.imdb.com/title/${show.show.externals.imdb}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    IMDb
                  </a>
                ) : null}
              </p>
            </div>
            {/* <p
              className="description"
              dangerouslySetInnerHTML={{ __html: stripTags(show.show.summary) }}
            /> */}
          </div>
          <button
            className="button"
            onClick={() => handleViewSummary(show.show.id)}
          >
            View Summary
          </button>
        </div>
      ))}
    </div>
    </>
  );
}

export default ShowList;
