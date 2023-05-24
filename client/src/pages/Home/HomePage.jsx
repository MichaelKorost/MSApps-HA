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
import SelectDropdown from "../../components/SelectDropdown/SelectDropdown";

function HomePage() {
  const [category, setCategory] = useState("sports");
  const [page, setPage] = useState(1); // page number
  const [order, setOrder] = useState("none"); //asc, desc, none

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
      // when component unmounts reset the state (message, isError, isLoading)
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
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const categoryOptions = [
    { value: "sports", label: "Sports" },
    { value: "fashion", label: "Fashion" },
    { value: "science", label: "Science" },
    { value: "animals", label: "Animals" },
    { value: "places", label: "Places" },
  ];

  const orderOptions = [
    { value: "none", label: "None" },
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  return (
    <div className="home">
      {isLoading && <Loading />}
      <p className="home__pages">{`${currentPage}/${totalPages}`}</p>
      <section className="home__actions">
        <button className="home__btn" onClick={handlePrevPage}>
          Prev
        </button>
        <SelectDropdown
          options={categoryOptions}
          value={category}
          onChange={handleCategoryChange}
        />
        <button className="home__btn" onClick={handleNextPage}>
          Next
        </button>
      </section>

      <section className="home__order-action">
        <p>Order photo ids by:</p>
        <SelectDropdown
          options={orderOptions}
          value={order}
          onChange={handleOrderChange}
        />
      </section>

      {/* when loading is finished show the photo grid */}
      <section>{!isLoading && <PhotoGrid photos={photos} />}</section>
    </div>
  );
}

export default HomePage;
