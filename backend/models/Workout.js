import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  exercise: {
    type: String,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  caloriesBurned: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    enum: ["Cardio", "Strength", "Yoga", "Running", "Cycling", "Swimming"],
    default: "Cardio"
  }

}, { timestamps: true });

export default mongoose.model("Workout", workoutSchema);