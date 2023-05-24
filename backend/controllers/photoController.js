const { mapPhotoObjects, fetchPhotos } = require("../utils/commonUtils");

// @desc    Get all photos
// @route   GET /api/photo/:category
// @access  Public

// getPhotos receives a category param and a page query
const getPhotos = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1; //default page is 1 or the page number sent from the client

    // fetch photos from the Pixabay API, receives page and category and returns photoObjects and totalPages
    const { photoObjects, totalPages } = await fetchPhotos(page, category);

    // map photoObjects to a new array of objects with only the properties we need
    const photos = mapPhotoObjects(photoObjects);

    res.status(200).json({ totalPages, currentPage: page, photos });
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return res.status(400).json({ message: "Pixabay API error" });
    }
    throw new Error("Internal Server Error");
  }
};

// @desc    Sort photos by id
// @route   GET /api/photo/sort/:order
// @access  Public

// sortPhotosById receives an order param (none, asc, desc) and a category and page query
const sortPhotosById = async (req, res) => {
  try {
    const { order } = req.params;
    const { category } = req.query;
    const page = parseInt(req.query.page) || 1; //default page is 1 or the page number sent from the client

    // fetch photos from the Pixabay API, receives page and category and returns photoObjects and totalPages
    const { photoObjects, totalPages } = await fetchPhotos(page, category);

    // map photoObjects to a new array of objects with only the properties we need
    const photos = mapPhotoObjects(photoObjects);

    // if order is none, return the photos as is
    if (order === "none") {
      return res.status(200).json({ totalPages, currentPage: page, photos });
    }

    // sort photos by id in ascending or descending order
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
