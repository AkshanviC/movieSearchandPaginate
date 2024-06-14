import { useContext } from "react";
import { MovieContext } from "../../context/context";
import { useInView } from "react-intersection-observer";

export default function ImageHandler() {
  const { searchData, count, search } = useContext(MovieContext);
  const highlightText = (text, query) => {
    // Escape the query string for regular expression usage
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi"); // Case-insensitive global search
    return text.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
  };

  const ImageLazy = ({ data, index }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      rootMargin: "100px 0px 0px 0px",
      threshold: 1,
    });
    return (
      <div
        className={`flex-clmn movie ${
          count.length === index + 1 || count.length === index + 2
            ? "align-slf"
            : ""
        }`}
        ref={ref}
      >
        {inView ? (
          <img
            loading="lazy"
            className="movieImg"
            src={`https://test.create.diagnal.com/images/${data["poster-image"]}`}
            onError={(e) =>
              (e.target.src =
                "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png")
            }
          />
        ) : (
          <img
            loading="lazy"
            className="movieImg"
            src={
              "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png"
            }
          />
        )}

        <span className="movieTitle">{data?.name}</span>
      </div>
    );
  };
  return (
    <div className="movieContent">
      {searchData ? (
        searchData.length ? (
          <div className="movieList">
            {searchData.map((data) => (
              <div
                className="movie"
                key={Math.floor(Math.random() * 734531893)}
              >
                <img
                  className="movieImg"
                  loading="lazy"
                  src={`https://test.create.diagnal.com/images/${data["poster-image"]}`}
                  onError={(e) =>
                    (e.target.src =
                      "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png")
                  }
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(data.name, search),
                  }}
                />
                {/* <span>{data?.name}</span> */}
              </div>
            ))}
          </div>
        ) : (
          <p className="unavailable">
            Sorry the searched content is unavailable
          </p>
        )
      ) : (
        <div className="movieList">
          {count?.map((data, index) => (
            <ImageLazy
              data={data}
              index={index}
              key={Math.floor(Math.random() * 734531893)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
