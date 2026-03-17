import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* ================= REGISTER ================= */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;