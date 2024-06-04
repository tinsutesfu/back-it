import mongoose from "mongoose";

const itschema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  ratingstars: { type: Number, required: true, min: 0, max: 5 }, // Enforce rating between 0 and 5 stars
  ratingcount: { type: Number, required: true, min: 0 },
  priceCents: { type: Number, required: true },
});

const itModel = mongoose.models.it || mongoose.model("it", itschema);

export default itModel;
