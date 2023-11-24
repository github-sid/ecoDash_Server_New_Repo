// signin.js
const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct (you might want to use a secure authentication method)
    if (user && user.password === password) {
      res.redirect("/greenhouse");
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
