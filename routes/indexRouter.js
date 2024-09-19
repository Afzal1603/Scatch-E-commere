const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/products-model");
const userModel = require("../models/user-model");
router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, isLogged: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success1 = req.flash("success1");
  res.render("shop", { products, success1 });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  console.log(req.user.email);
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success1", "Added to cart");
  res.redirect("/shop");
});

module.exports = router;
