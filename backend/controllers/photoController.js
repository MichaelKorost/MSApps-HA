const axios = require("axios");

const { PIXABAY_API_KEY } = process.env;

const BASE_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&per_page=9`;

// @desc    Get all photos
// @route   GET /api/photo
// @access  Public

const getPhotos = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1; //default page is 1 or the page number sent from the client
    const response = await axios.get(`${BASE_URL}&page=${page}&q=${category}`);
    const photoObjects = response.data.hits;
    const photos = photoObjects.map((photo) => ({
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
    const totalPages = Math.ceil(response.data.totalHits / 9); // 9 is the number of photos per page

    res.status(200).json({ totalPages, currentPage: page, photos });
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
    const category = req.query.category;
    const page = parseInt(req.query.page) || 1;
    const response = await axios.get(`${BASE_URL}&page=${page}&q=${category}`);
    const photoObjects = response.data.hits;
    const totalPages = Math.ceil(response.data.totalHits / 9); // 9 is the number of photos per page

    const photos = photoObjects.map((photo) => ({
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

    if (order === "none") {
      return res.status(200).json({ totalPages, currentPage: page, photos });
    }

    if (order === "desc") {
      photos.sort((a, b) => b.id - a.id);
    } else if (order === "asc") {
      photos.sort((a, b) => a.id - b.id);
    }

    res.status(200).json({ totalPages, currentPage: page, photos });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getPhotos, sortPhotosById };
