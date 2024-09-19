const express = require("express");
const router = express.Router();
const {
  registeredUser,
  logoutUser,
  loginUser,
} = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("hey its working");
});

router.post("/register", registeredUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
