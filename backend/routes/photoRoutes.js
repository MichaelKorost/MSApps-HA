const express = require("express");
const { getPhotos, sortPhotosById } = require("../controllers/photoController");

const router = express.Router();

router.get("/", getPhotos);
router.get("/sort/:order", sortPhotosById);

module.exports = router;
