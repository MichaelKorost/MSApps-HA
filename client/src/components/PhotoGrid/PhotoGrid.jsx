import "./PhotoGrid.css"
import Photo from "./Photo"


function PhotoGrid({photos}) {
  return (
    <div className="photo-grid">
        {photos.map((photo) => (<Photo key={photo.id} photo={photo}/>))}
    </div>
  )
}

export default PhotoGrid