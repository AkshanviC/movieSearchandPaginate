import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";

import "./App.css";
import ApiGet from "./api/api";

function App() {
  const [others, setOthers] = useState("");
  const [count, setCount] = useState([]);
  const [scrollUpdate, setScrollUpdate] = useState(1);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [seachCount, setSeachCount] = useState("");
  const [seach, setSeach] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["name"],
  };

  const fuse = new Fuse(count, options);
  useEffect(() => {
    ApiGet(currentPage, setCount, setPage, page, setOthers);
    const onscroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const threshold = 100;
      const isReachBottom =
        document.body.scrollHeight - threshold <= scrolledTo;
      if (isReachBottom) {
        setScrollUpdate(scrollUpdate + 1);
      } else {
        console.log(currentPage, page);
      }
    };
    window.addEventListener("scroll", onscroll);
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, []);
  useEffect(() => {
    if (currentPage <= page) {
      setCurrentPage(currentPage + 1);
      ApiGet(currentPage + 1, setCount, setPage, page, setOthers);
    }
  }, [scrollUpdate]);
  useEffect(() => {
    if (seach) {
      const results = fuse.search(seach);
      const items = results.map((result) => result.item);
      setSeachCount(items);
    } else {
      setSeachCount("");
    }
  }, [seach]);
  const handleFallBack = () => {};
  return (
    <>
      <div className="flex-row navbar">
        <div className="flex-row childNav ">
          <img
            onClick={() => {
              setIsSearch(false);
              setSeachCount("");
              setSeach("");
            }}
            className="backButton"
            src="https://test.create.diagnal.com/images/Back.png"
            alt="no img"
          />
          <span className="genre">{others?.title}</span>
        </div>
        <div className="flex-row childNav txt-right">
          {isSearch ? (
            <input
              value={seach}
              onChange={(e) => setSeach(e.target.value)}
              maxLength={40}
            />
          ) : (
            <img
              onClick={() => setIsSearch(true)}
              className="backButton"
              src="https://test.create.diagnal.com/images/search.png"
              alt="no img"
            />
          )}
        </div>
      </div>
      <div className="movieContent">
        <div className="movieList">
          {seachCount ? (
            seachCount.length ? (
              <div className="movieList">
                {seachCount.map((data, index) => (
                  <div className="movie">
                    <img
                      className="movieImg"
                      loading="lazy"
                      src={`https://test.create.diagnal.com/images/${data["poster-image"]}`}
                      onError={(e) =>
                        (e.target.src =
                          "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png")
                      }
                    />
                    <p>{data?.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Sorry the searched content is unavailable</p>
            )
          ) : (
            count?.map((data, index) => (
              <div className="movie">
                <img
                  className="movieImg"
                  loading="lazy"
                  src={`https://test.create.diagnal.com/images/${data["poster-image"]}`}
                  onError={(e) =>
                    (e.target.src =
                      "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png")
                  }
                />
                <p>{data?.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
