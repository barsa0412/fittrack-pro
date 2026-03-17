import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import workoutRoutes from "./routes/workout.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(express.json());

app.use(cors({
  origin: "*"
}));

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRoutes);

/* ================= DATABASE CONNECTION ================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});