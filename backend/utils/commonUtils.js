const axios = require("axios");

const { PIXABAY_API_KEY } = process.env;

const BASE_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&per_page=9`; // 9 is the number of photos per page

const fetchPhotos = async (page, category) => {
  const response = await axios.get(`${BASE_URL}&page=${page}&q=${category}`);
  const photoObjects = response.data.hits;
  const totalPages = Math.ceil(response.data.totalHits / 9); // 9 is the number of photos per page

  return { photoObjects, totalPages };
};

// making a common function to map the photo objects with only the properties we need
const mapPhotoObjects = (photoObjects) => {
  return photoObjects.map((photo) => ({
    id: photo.id,
    imgUrl: photo.webformatURL,
    views: photo.views,
    downloads: photo.downloads,
    collection: photo.collections,
    likes: photo.likes,
    tags: photo.tags,
    user: photo.user,
    userImgUrl: photo.userImageURL,
  }));
};

module.exports = { mapPhotoObjects, fetchPhotos };
