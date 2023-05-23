const axios = require("axios");

// Ideally, the API key should be in a .env file
// const KEY = "25540812-faf2b76d586c1787d2dd02736";
const KEY = "36661905-11455a0e09cdfa43c40696a1d";

const BASE_URL = `https://pixabay.com/api/?key=${KEY}&per_page=9`;

// @desc    Get all photos
// @route   GET /api/photo
// @access  Public

const getPhotos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; //default page is 1 or the page number sent from the client
    const response = await axios.get(`${BASE_URL}&page=${page}&q=sports`);
    const photos = response.data.hits;
    const photoUrls = photos.map((photo) => photo.webformatURL);
    const totalPages = Math.ceil(response.data.totalHits / 9); // 9 is the number of photos per page

    res.status(200).json({ totalPages, currentPage: page, photoUrls });
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return res.status(400).json({ message: "Pixabay API error" });
    }
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Sort photos by id
// @route   GET /api/photo/sort/:order
// @access  Public

const sortPhotosById = async (req, res) => {
  try {
    const { order } = req.params;
    const response = await axios.get(`${BASE_URL}&q=sports`);
    const photos = response.data.hits;
    if (order === "desc") {
      photos.sort((a, b) => b.id - a.id);
    } else if (order === "asc") {
      photos.sort((a, b) => a.id - b.id);
    }

    const photoUrls = photos.map((photo) => photo.id);
    res.status(200).json(photoUrls);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getPhotos, sortPhotosById };
