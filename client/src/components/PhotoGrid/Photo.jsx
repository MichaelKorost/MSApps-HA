import "./Photo.css";
import { useState } from "react";

function Photo({ photo }) {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleClick = (photo) => {
    setSelectedPhoto(photo);
    setIsClicked(true);
  };

  const handleCloseModal = () => {
    setIsClicked(false);
  };

  return (
    <>
      <img
        className="photo"
        src={photo.imgUrl}
        alt="searched-img"
        key={photo.id}
        onClick={() => handleClick(photo)}
      />

      {isClicked && (
        <section className="modal-section">
          <div
            className={`backdrop${isClicked ? "--active" : ""}`}
            onClick={handleCloseModal}
          ></div>
          <div className="modal">
            <div>
              <span className="modal__close" onClick={handleCloseModal}>
                X
              </span>
            </div>
            <div className="modal__info">
              <section className="modal__user">
                <img
                  src={
                    selectedPhoto.userImgUrl ||
                    "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
                  }
                  alt="user"
                />
                <p>{selectedPhoto.user}</p>
              </section>

              <section className="modal__stats">
                <p>Collection: {selectedPhoto.collection}</p>
                <p>Downloads: {selectedPhoto.downloads}</p>
                <p>tags: {selectedPhoto.tags}</p>
                <p>id: {selectedPhoto.id}</p>
              </section>

              <section className="modal__stats2">
                <p>
                  {selectedPhoto.views} <b>Views</b>
                </p>
                <p>
                  {selectedPhoto.likes} <b>Likes</b>
                </p>
              </section>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Photo;
