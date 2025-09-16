const express = require("express");
const router = express.Router();
const { createItinerary, getItineraries, getItineraryById } = require("../controllers/itineraryController");
const upload = require("../config/multer");

// POST itinerary (with multiple fields + images)
router.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  createItinerary
);

// GET all itineraries
router.get("/", getItineraries);

// GET itinerary by id
router.get("/:id", getItineraryById);

module.exports = router;
