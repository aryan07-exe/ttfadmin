const Itinerary = require("../models/Itinerary");

// Create Itinerary
const createItinerary = async (req, res) => {
  try {
    const { title, duration, locations, shortDescription, daysPlan } = req.body;

    // Cloudinary URLs will be in req.files
    const coverImage = req.files?.coverImage?.[0]?.path || "";
    const images = req.files?.images?.map(file => file.path) || [];

    const itinerary = new Itinerary({
      title,
      duration: JSON.parse(duration),  // comes as string in FormData
      locations: JSON.parse(locations), 
      coverImage,
      images,
      shortDescription,
      daysPlan: JSON.parse(daysPlan), // store nested plan
    });

    const savedItinerary = await itinerary.save();
    res.status(201).json(savedItinerary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Itineraries
const getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Itinerary
const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: "Not found" });
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createItinerary, getItineraries, getItineraryById };
