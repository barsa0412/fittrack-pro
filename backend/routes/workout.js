import express from "express";
import Workout from "../models/Workout.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= ADD WORKOUT ================= */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    console.log("REQ.USER:", req.user); // DEBUG LINE

    const { exercise, duration, caloriesBurned } = req.body;

    const workout = await Workout.create({
      userId: req.user.id,
      exercise,
      duration,
      caloriesBurned
    });

    res.status(201).json(workout);

  } catch (error) {
    console.error("ADD WORKOUT ERROR:", error); // IMPORTANT
    res.status(500).json({ error: error.message });
  }
});

/* ================= GET USER WORKOUTS ================= */
router.get("/user", authMiddleware, async (req, res) => {
  try {
    console.log("REQ.USER:", req.user); // DEBUG LINE

    const workouts = await Workout.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(workouts);

  } catch (error) {
    console.error("GET WORKOUT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;