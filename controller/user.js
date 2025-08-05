const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const userCtrl = {
  //!register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("All the fields are required");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    //hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create the user
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({
      message: "user created successfully",
    });
  }),
  login: asyncHandler(async (req, res) => {
    //check is user email exists
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      
        throw new Error("invalid credentials");
      
    }
    //check if user password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("invalid credentials");
    }
    //Generate token
    const token = jwt.sign({ id: user._id }, "anykey", { expiresIn: "30d" });
    //set token in httponly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    //send response
    res.json({
      message: "login success",
      id: user._id,
      token,
    });
  }),
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user).select("-password");
    res.json({ user });
  }),
};
module.exports = userCtrl;
