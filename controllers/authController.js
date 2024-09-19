const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const flash = require("connect-flash");
module.exports.registeredUser = async (req, res) => {
  try {
    let { email, password, fullName } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      res.status(505);
      req.flash("error", "User already registered");
      return res.redirect("/");
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
        req.flash("error", "User Registerd Successfully");
        res.redirect("/");
      });
    });
  } catch (err) {
    console.log("error");

    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Something Went Wrong");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Something Went Wrong");
      return res.redirect("/");
    }
  });
};
module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "");
  req.flash("logged out");
  res.redirect("/");
};
