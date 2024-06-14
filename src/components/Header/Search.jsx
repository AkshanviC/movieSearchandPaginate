import { useContext, useState } from "react";
import { MovieContext } from "../../context/context";

export default function SearchFn() {
  const { setSearch, setIsSearch, others, isSearch, search, searchData } =
    useContext(MovieContext);
  const [dissapper, setDissapper] = useState(true);
  return (
    <div className="flex-row navbar">
      <div className="flex-row childNav ">
        <img
          onClick={() => {
            setSearch("");
            setIsSearch(false);
            setDissapper(true);
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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === "") setDissapper(true);
            }}
            maxLength={30}
          />
        ) : (
          <img
            onClick={() => setIsSearch(true)}
            className="backButton"
            src="https://test.create.diagnal.com/images/search.png"
            alt="no img"
          />
        )}
        {searchData.length && dissapper ? (
          <div className="dropdown">
            {searchData.slice(0, 3).map((data) => (
              <div
                onClick={() => {
                  setDissapper(false);
                  setSearch(data.name);
                }}
              >
                {data.name}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
