const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",   // React local
  "http://localhost:5173",   // Vite local (if needed)
  "https://www.ttfholidays.in/",  // Production
  "https://admin.yourdomain.com" // Admin Panel
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
// Routes
const itineraryRoutes = require("./routes/itineraryRoutes");
app.use("/api/itineraries", itineraryRoutes);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Simple route
app.get("/", (req, res) => {
  res.send("Hello, Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
