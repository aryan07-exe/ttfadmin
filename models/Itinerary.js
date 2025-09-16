const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: {
    nights: Number,
    days: Number,
  },
  locations: [String],
  coverImage: String,
  images: [String],
  shortDescription: String,
  daysPlan: [
    {
      dayNumber: Number,
      title: String,
      description: String,
      activities: [
        {
          timeOfDay: String,
          activity: String,
          notes: String,
          images: [String],
        },
      ],
      overnightStay: String,
      meals: [String],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Itinerary", itinerarySchema);
