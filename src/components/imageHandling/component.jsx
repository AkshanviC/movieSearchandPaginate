import { useInView } from "react-intersection-observer";

export const ImageLazy = ({ data }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px 50px 0px",
    threshold: 1,
  });
  return (
    <div className={`flex-clmn movie `}>
      <img
        ref={ref}
        loading="lazy"
        className="movieImg"
        src={`${
          inView
            ? `https://test.create.diagnal.com/images/${data["poster-image"]}`
            : "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png"
        }`}
        onError={(e) =>
          (e.target.src =
            "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png")
        }
      />
      <span className="movieTitle">{data?.name}</span>
    </div>
  );
};
