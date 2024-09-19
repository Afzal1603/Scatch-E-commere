const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");
const productModel = require("../models/products-model");
const upload = require("../config/multer-config");
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

router.get("/create-products", (req, res) => {
  res.render("create-products");
});
router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("create-products", { success });
});

module.exports = router;
