const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productmodel = require("../models/products-model");
router.post("/create", upload.single("image"), async (req, res) => {
  let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  try {
    let product = await productmodel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    res.send("error", err);
  }
});

module.exports = router;
