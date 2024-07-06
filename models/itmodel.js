import mongoose from "mongoose";

const itschema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  ratingstars: { type: Number, required: true, min: 0, max: 5 }, // Enforce rating between 0 and 5 stars
  ratingcount: { type: Number, required: true, default: 0 }, // Initialize rating count to 0
  userRatings: [{ // Array to store individual user ratings
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    rating: { type: Number, required: true, min: 0, max: 5 }, // Individual user's rating
  }],
  priceCents: { type: Number, required: true },
});

const itModel = mongoose.models.it || mongoose.model("it", itschema);

export default itModel;