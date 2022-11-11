const Wine = require("../models/wineModel.js");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

module.exports.test = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Fail Test");
  }
};

//CREATE
//PATH POST /api/wine
module.exports.createWine = asyncHandler(async (req, res) => {
  //VALIDATIONS
  if (
    !req.body.name ||
    !req.body.winery ||
    !req.body.country ||
    !req.body.region ||
    !req.body.year ||
    !req.body.grapes ||
    !req.body.alcoholContent ||
    !req.body.rating ||
    !req.body.tastingNotes ||
    !req.body.img
  ) {
    res.status(400);
    throw new Error("Please Enter Missing Field(s)");
  }
  const wine = await Wine.create({
    name: req.body.name,
    winery: req.body.winery,
    country: req.body.country,
    region: req.body.region,
    year: req.body.year,
    grapes: req.body.grapes,
    alcoholContent: req.body.alcoholContent,
    rating: req.body.rating,
    tastingNotes: req.body.tastingNotes,
    img: req.body.img,
    user: req.user.id, //CREATES FOR A SPECIFIC USER
  });

  res.status(200).json(wine);
  res.status(400).json(err);
});

//READ
//PATH GET /api/wine
module.exports.allWines = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const userWines = await User.findById(user_id);
  if (!userWines) {
    throw new Error("User Not Found");
  }

  const wine = await Wine.find({ user: userWines });
  if (!wine) {
    throw new Error("Wine Not Found");
  }

  res.status(200).json(wine);
});

//PATH GET /api/wine/wine_id
module.exports.oneWine = asyncHandler(async (req, res) => {
  const { wine_id } = req.params;
  const wine = await Wine.findOne({ _id: wine_id });
  if (!wine) {
    throw new Error("Wine Not Found");
  }
  res.status(200).json(wine);
});

//UPDATE
//PATH PUT /api/wine/wine_id

module.exports.updateWine = asyncHandler(async (req, res) => {
  const { wine_id } = req.params;
  const wine = await Wine.findById({ _id: wine_id });
  if (!wine) {
    throw new Error("Wine Not Found");
  }

  const user = await User.findById(req.user.id); //LOGGED IN USER

  //CHECK FOR USER
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //MAKE SURE LOGGED IN USER MATCHED THE PERSON USER
  if (wine.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  const updateWine = await Wine.findByIdAndUpdate(wine_id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(updateWine);
});

//DELETE
//PATH DELETE /api/wine/wine_id

module.exports.deleteWine = asyncHandler(async (req, res) => {
  const { wine_id } = req.params;
  const wine = await Wine.findById({ _id: wine_id });

  if (!wine) {
    res.status(400);
    throw new Error("Wine not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the wine user
  if (wine.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deleteWine = await Wine.findByIdAndDelete({ _id: wine_id });

  res.status(200).json(deleteWine);
});
