const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthMiddleware.");
const { Login, Signup } = require("../Controllers/AuthController");
const router = express.Router();

router.post("/login", loginValidation, Login);

router.post("/signup", signupValidation, Signup);
module.exports = router;
