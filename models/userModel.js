const mongoose = require("mongoose");

//1. DEFINE THE SCHEMA

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Passowrd is Required"],
      minlength: [8, "Password Must Be At Least 8 Characters Long"],
    },
  },
  { timestamps: true }
);

//2. REGISTERING THE SCHEMA

module.exports = mongoose.model("User", UserSchema);
