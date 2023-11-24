const express = require("express");
const router = express.Router();
const User = require("../model/user"); // Make sure to create a User model

router.post("/", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user using the User model
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    res.redirect("/greenhouse");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
