const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

router.get("/", (req, res) => {
  res.send("hey its working");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res.status(504).send("Not allowed");
    }
    let { fullName, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

module.exports = router;
