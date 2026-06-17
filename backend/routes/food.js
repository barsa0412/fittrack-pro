import express from "express";
import Food from "../models/Food.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ADD FOOD */
router.post("/add", authMiddleware, async (req, res) => {

  try {

    const food = await Food.create({
      userId: req.user.id,
      ...req.body
    });

    res.status(201).json(food);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

/* GET USER FOODS */
router.get("/user", authMiddleware, async (req, res) => {

  try {

    const foods = await Food.find({
      userId: req.user.id
    });

    res.json(foods);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

export default router;