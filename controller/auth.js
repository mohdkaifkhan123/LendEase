const express = require("express");
const router = express.Router();
const user = require("../model/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verify");

require("dotenv").config();
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (role == "user" || role == "admin") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = new user({ email, password: hashedPassword, role });
      const users = await data.save();
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const details = await user.findOne({ email });
    if (!details) return res.status(400).json("User not found");
    const match = await bcrypt.compare(password, details.password);
    if (!match) return res.status(400).json("Password incorrect");

    if (role != details.role) return res.status(400).json("Role not matching");
    const token = jwt.sign(
      { userId: details._id, role: details.role },
      process.env.key,
      { expiresIn: "1h" }
    );

    res.status(200).json({ role, token });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", verify, (req, res) => {
  res.status(200).json("Authentication Working");
});

module.exports = router;
