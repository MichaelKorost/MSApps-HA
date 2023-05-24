import axios from "axios";

const API_URL = "http://localhost:4000/api/photo";

// get photos
const getPhotos = async (category, page) => {
  try {
    const response = await axios.get(`${API_URL}/${category}?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
// get photos by order
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
