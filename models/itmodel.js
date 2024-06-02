import mongoose from "mongoose";

const itschema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  rating: {
    stars: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  priceCents: { type: Number, required: true },
});

const itModel = mongoose.models.it || mongoose.model("it", itschema);

export default itModel;
