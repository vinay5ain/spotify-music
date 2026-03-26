import express from "express";
import cors from "cors"
import "dotenv/config"
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";

//app config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json())
app.use(cors())

//initializing routes
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.get('/', (req, res) => res.send("API Working"));

app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ success: false, message: err.message || "Request failed" });
  }
  next();
});

app.listen(port, () => console.log(`Server started on ${port}`));
