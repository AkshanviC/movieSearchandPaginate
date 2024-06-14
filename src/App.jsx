import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import "./App.css";
import ApiGet from "./api/api";
import { MovieContext } from "./context/context";
import SearchFn from "./components/Header/Search";
import ImageHandler from "./components/imageHandling/ImageHandler";

function App() {
  const [others, setOthers] = useState("");
  const [count, setCount] = useState([]);
  const [scrollUpdate, setScrollUpdate] = useState(1);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [initialThrottle, setInitalThrottle] = useState(false);

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
        setScrollUpdate((scroll) => scroll + 1);
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
      if (initialThrottle) {
        setCurrentPage(currentPage + 1);
        ApiGet(currentPage + 1, setCount, setPage, page, setOthers);
      } else {
        setInitalThrottle(true);
      }
    }
  }, [scrollUpdate]);
  useEffect(() => {
    if (search) {
      const results = fuse.search(search);
      const items = results.map((result) => result.item);
      setSearchData(items);
    } else {
      setSearchData("");
    }
  }, [search]);

  return (
    <>
      <MovieContext.Provider
        value={{
          setSearch,
          setSearchData,
          setIsSearch,
          others,
          isSearch,
          searchData,
          count,
        }}
      >
        <SearchFn />
        <ImageHandler />
      </MovieContext.Provider>
    </>
  );
}

export default App;
