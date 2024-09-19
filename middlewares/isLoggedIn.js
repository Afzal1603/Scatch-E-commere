const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "something went wrong");
    res.redirect("/");
  }
};
