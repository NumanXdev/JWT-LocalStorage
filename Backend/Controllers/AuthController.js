require("dotenv").config();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are madatory" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(403).json({
        message: "Auth failed email or password is wrong",
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      res.status(403).json({
        message: "Auth failed email or password is wrong",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id }, //payload
      process.env.TOKEN_KEY, //Secreat
      {
        expiresIn: "3h",
      }
    );

    res.status(200).json({
      message: "Login successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Interval server error", success: false });
  }
};

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.json({ message: "All fiels are madatory" });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ message: "User already exists", success: false });
    }
    const userModel = new User({ name, email, password });
    userModel.password = await bcrypt.hash(password, 12);
    await userModel.save();
    res.status(201).json({ message: "Signup Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  Login,
  Signup,
};
