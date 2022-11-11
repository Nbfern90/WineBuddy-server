const mongoose = require("mongoose");

//1. DEFINE THE SCHEMA
const WineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is Required"],
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Wine Name is Required"],
  },
  winery: {
    type: String,
    required: [true, "Winery Name is Required"],
  },
  country: {
    type: String,
    required: [true, "Country of Production is Required"],
  },
  region: {
    type: String,
    required: [true, "Region of Production is Required"],
  },
  year: {
    type: Number,
    required: [true, "Wine Vintage is Required"],
    minimum: [4, "Please Enter a Valid Year"],
    maximum: [4, "Please Enter a Valid Year"],
  },
  grapes: {
    type: String,
    required: [true, "Please Enter Grape(s) Type(s)"],
  },
  alcoholContent: {
    type: Number,
    required: [true, "Please Enter Alcohol Percentage"],
    maximum: [50, "Please Enter a Valid Percentage"],
  },
  rating: {
    type: Number,
    required: [true, "Please Enter a Rating"],
  },
  tastingNotes: {
    type: String,
    required: [true, "Please Enter Tasting Notes"],
  },
  img: {
    type: String,
  },
});

//2. REGISTERING THE SCHEMA
module.exports = mongoose.model("Wine", WineSchema);
