import axios from "axios";

// deployed API_URL
const API_URL = "https://ms-apps-ha-navy.vercel.app/api/photo";

// get photos
// receives destructured category and page from photoSlice.js and passes them to the API_URL
const getPhotos = async (category, page) => {
  try {
    const response = await axios.get(`${API_URL}/${category}?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// get photos by order
// receives destructured category, page, and order from photoSlice.js and passes them to the API_URL
const getPhotosByOrder = async (category, page, order) => {
  try {
    const response = await axios.get(
      `${API_URL}/sort/${order}?category=${category}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const photoService = { getPhotos, getPhotosByOrder };

export default photoService;
