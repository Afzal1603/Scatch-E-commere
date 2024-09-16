const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

router.get("/", (req, res) => {
  res.send("hey its working");
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, fullName } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(505).send("Something Went Wrong");
    }
    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await userModel.create({
          fullName,
          email,
          password: hash,
        });
        let token = generateToken(createdUser);
        res.cookie("token", token);
        res.send("User Registerd Successfully");
      });
    });
  } catch (err) {
    console.log("error");

    res.send(err.message);
  }
});

module.exports = router;
