const axios = require("axios");

// Ideally, the API key should be in a .env file
// const KEY = "25540812-faf2b76d586c1787d2dd02736";
const KEY = "36661905-11455a0e09cdfa43c40696a1d";

const BASE_URL = `https://pixabay.com/api/?key=${KEY}&q=sports&per_page=9&page=4`;

// @desc    Get all photos
// @route   GET /api/photo
// @access  Public

const getPhotos = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    const photos = response.data.hits;
    const photoUrls = photos.map((photo) => photo.webformatURL);
    res.status(200).json(photoUrls);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getPhotos };
