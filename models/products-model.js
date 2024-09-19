const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: Buffer,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: {
    type: String,
    default: "#fb923c",
  },
});

module.exports = mongoose.model("product", productSchema);
