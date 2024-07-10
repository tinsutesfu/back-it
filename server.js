import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import itrouter from "./routes/itroute.js";
import userrouter from "./routes/userroute.js";
import "dotenv/config";
import cartrouter from "./routes/cartrouter.js";
import orderrouter from "./routes/orderroute.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(cors());

connectDB();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/it", itrouter);
app.use("/images", express.static("uploads"));

app.use("/api/user", userrouter);
app.use("/api/cart", cartrouter);
app.use("/api/place", orderrouter);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
