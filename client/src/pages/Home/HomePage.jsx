import "./HomePage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPhotos,
  reset,
  getPhotosByOrder,
} from "../../features/photo/photoSlice";
import PhotoGrid from "../../components/PhotoGrid/PhotoGrid";
import Loading from "../../components/Loading/Loading";

function HomePage() {
  const [category, setCategory] = useState("sports");
  const [page, setPage] = useState(1); // page number
  const [order, setOrder] = useState("none");
  const dispatch = useDispatch();
  const { photos, totalPages, currentPage, isError, isLoading, message } =
    useSelector((state) => state.photo);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (order === "none") {
      dispatch(getPhotos({ category, page }));
    } else {
      dispatch(getPhotosByOrder({ category, page, order }));
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, category, page, order]);

  const handleCategoryChange = (e) => {
    if (e.target.value === category) return;
    setCategory(e.target.value);
    setPage(1);
  };

  const handleOrderChange = (e) => {
    if (e.target.value === order) return;
    setOrder(e.target.value);
    // dispatch(getPhotosByOrder({ category, page, order: e.target.value }));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage((prevPage) => prevPage + 1);
      //   setOrder("none");
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPage((prevPage) => prevPage - 1);
      //   setOrder("none")
    }
  };

  useEffect(() => {
    console.log(photos);
    console.log(totalPages);
    console.log(currentPage);
    console.log(page);
  }, [photos, totalPages, currentPage, page]);

  return (
    <div className="home">
      {isLoading && <Loading />}
      <p className="home__pages">{`${currentPage}/${totalPages}`}</p>
      <section className="home__actions">
        <button className="home__btn" onClick={handlePrevPage}>
          Prev
        </button>
        <select
          className="home__select"
          name="categories"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="sports">Sports</option>
          <option value="fashion">Fashion</option>
          <option value="science">Science</option>
          <option value="animals">Animals</option>
          <option value="places">Places</option>
        </select>
        <button className="home__btn" onClick={handleNextPage}>
          Next
        </button>
      </section>

      <section className="home__order-action">
        <p>Order id by:</p>
        <select
          className="home__select"
          onChange={handleOrderChange}
          value={order}
        >
          <option value="none">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </section>

      <section>{!isLoading && <PhotoGrid photos={photos} />}</section>
    </div>
  );
}

export default HomePage;
