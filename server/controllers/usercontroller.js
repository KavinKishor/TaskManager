const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let createuser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 7);
  const exisitinguser = await User.findOne({ email });
  if (exisitinguser) {
    return res
      .status(400)
      .json({ success: false, message: "user email already registered" });
  }
  try {
    const user = await new User({ email, name, password: hashed });
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "user created successfully", user });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Error occured to create new user" });
  }
});

let loguser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  console.log(re.body);
  
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email is not registerd",
      });
    }
    
    
    const userPassword = await bcrypt.compare(password, user.password);
    console.log(userPassword);
    
    if (!userPassword) {
      return res.status(401).json({
        success: false,
        message: "Password you have entered is not correct",
      });
    }
    const userToken = jwt.sign({ _id: user._id }, process.env.Token, {
      expiresIn: "30d",
    });
    return res
      .status(200)
      .json({ success: true, message: "user logged successfully", userToken });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
});

module.exports = { createuser, loguser };
