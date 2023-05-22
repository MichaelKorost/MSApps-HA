const express = require("express");
const { getPhotos } = require("../controllers/photoController");

const router = express.Router();

router.get("/", getPhotos);

module.exports = router;
