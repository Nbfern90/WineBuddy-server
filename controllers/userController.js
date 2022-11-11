const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//GENERATE TOKEN
//Signs a new token with the id that is passed in with our secret
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//CREATE
// Path POST /api/users
module.exports.register = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Please Fill in All Fields");
  }
  //CHECK IF USER EXISTS
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Sorry, User Already Exists");
  }

  //HASH PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //CREATE THE USER
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//DESC    Authenticate a user
//PATH  POST /api/users/

module.exports.userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//READ
//PATH GET /api/users/me

module.exports.getMe = asyncHandler(async (req, res) => {
  const { _id, userName, email } = await User.findById(req.user.id); //comes from middleware

  res.status(200).json({
    id: _id,
    userName,
    email,
  });
});

// Gets All Users
//PATH GET /api/users/all
module.exports.allUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});

// Gets One Users
//PATH GET /api/users/all/:user_id
module.exports.oneUser = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById({ _id: user_id });
  if (!user) {
    throw new Error("User Not Found");
  }
  res.status(200).json(user);
});
