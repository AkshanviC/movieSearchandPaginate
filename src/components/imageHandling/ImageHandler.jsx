import { useContext } from "react";
import { MovieContext } from "../../context/context";

export default function ImageHandler() {
  const { searchData, count } = useContext(MovieContext);
  return (
    <div className="movieContent">
      {searchData ? (
        searchData.length ? (
          <div className="movieList">
            {searchData.map((data) => (
              <div className="movie" key={Math.floor(Math.random() * 734533)}>
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
        <div className="movieList">
          {count?.map((data) => (
            <div className="movie" key={Math.floor(Math.random() * 734533)}>
              <img
                className="movieImg"
                loading="lazy"
                src={`https://test.create.diagnal.com/images/${data["poster-image"]}`}
                onError={(e) =>
                  (e.target.src =
                    "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png")
                }
              />
              <p className="movieTitle">{data?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
