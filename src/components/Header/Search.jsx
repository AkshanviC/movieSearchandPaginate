import { useContext } from "react";
import { MovieContext } from "../../context/context";

export default function SearchFn() {
  const { setSearch, setSeachCount, setIsSearch, others, isSearch } =
    useContext(MovieContext);
  return (
    <div className="flex-row navbar">
      <div className="flex-row childNav ">
        <img
          onClick={() => {
            setIsSearch(false);
            setSeachCount("");
            setSearch("");
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
  );
}
