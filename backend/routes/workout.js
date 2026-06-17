import express from "express";
import Workout from "../models/Workout.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= ADD WORKOUT ================= */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { exercise, duration, caloriesBurned, category } = req.body;

    const workout = await Workout.create({
      userId: req.user.id,
      exercise,
      duration,
      caloriesBurned,
      category
    });

    res.status(201).json(workout);

  } catch (error) {
    console.error("ADD WORKOUT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ================= GET USER WORKOUTS ================= */
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(workouts);

  } catch (error) {
    console.error("GET WORKOUT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ================= UPDATE WORKOUT ================= */
router.put("/updateWorkout/:id", authMiddleware, async (req, res) => {
  try {

    const workout = await Workout.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      req.body,
      {
        new: true
      }
    );

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found"
      });
    }

    res.json(workout);

  } catch (error) {
    console.error("UPDATE WORKOUT ERROR:", error);
    res.status(500).json({
      error: error.message
    });
  }
});

/* ================= DELETE WORKOUT ================= */
router.delete("/deleteWorkout/:id", authMiddleware, async (req, res) => {
  try {

    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found"
      });
    }

    res.json({
      message: "Workout deleted successfully"
    });

  } catch (error) {
    console.error("DELETE WORKOUT ERROR:", error);
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;