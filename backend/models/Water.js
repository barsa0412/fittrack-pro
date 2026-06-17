import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  }

}, {
  timestamps: true
});

export default mongoose.model(
  "Water",
  waterSchema
);