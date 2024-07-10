import itModel from "../models/itmodel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendUploadDir = path.join(__dirname, "../uploads");
const addit = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const it = new itModel({
    image: image_filename,
    name: req.body.name,

    ratingstars: req.body.ratingstars,
    ratingcount: req.body.ratingcount,
    priceCents: req.body.priceCents,
  });
  try {
    const sourcePath = path.join(req.file.destination, req.file.filename);
    const destPath = path.join(backendUploadDir, req.file.filename);
    fs.copyFileSync(sourcePath, destPath);

    await it.save();
    res.json({ success: true, message: "Item added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding item" });
  }
};

const addrating = async (req, res) => {
  const { productId, rating } = req.body;
  const userId = req.body.userId;
  if (!productId || !rating) {
    return res.json({ success: false, message: "Missing required data" });
  }

  try {
    const it = await itModel.findById(productId);
    if (!it) {
      return res.json({ success: false, message: "Product not found" });
    }

    const existingRating = it.userRatings.find(
      (rating) => rating.userId.toString() === userId
    );

    if (existingRating) {
      return res.json({
        success: false,
        message: "You have already rated this product",
      });
    }

    // Update user ratings array
    it.userRatings.push({
      userId, //
      rating,
    });

    const totalRatings = it.userRatings.length;
    const totalRating = it.userRatings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    );
    it.ratingstars = totalRating / totalRatings || 0; // Handle potential division by zero
    it.ratingcount = totalRatings;

    await it.save();
    res.json({ success: true, message: "Your rating has been submitted!" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

const itlist = async (req, res) => {
  try {
    const its = await itModel.find({});
    res.json({ success: true, data: its });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const removeit = async (req, res) => {
  try {
    const it = await itModel.findById(req.body.id);
    fs.unlink(`uploads/${it.image}`, () => {});
    await itModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "it removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { addit, itlist, removeit, addrating };
