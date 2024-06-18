import axios from "axios";

export default function ApiGet(
  currentPage,
  setCount,
  setPage,
  page,
  setOthers
) {
  axios
    .get(`https://test.create.diagnal.com/data/page${currentPage}.json`)
    .then((res) => {
      let pageCount = 0;
      setOthers(res?.data?.page);
      setCount((count) => [
        ...count,
        ...res?.data?.page["content-items"]?.content,
      ]);
      if (page === 1) {
        pageCount =
          res?.data?.page["total-content-items"] / 20 >
          Math.floor(res?.data?.page["total-content-items"] / 20)
            ? Math.floor(res?.data?.page["total-content-items"] / 20) + 1
            : res?.data?.page["total-content-items"];
        setPage(pageCount);
      }
    })
    .catch((err) => console.log(err));
}
