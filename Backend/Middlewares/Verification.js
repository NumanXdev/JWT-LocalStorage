require("dotenv").config();
const jwt = require("jsonwebtoken");
const ensureVerification = (req, res, next) => {
  const Auth = req.headers["authorization"];
  console.log("Auth " + Auth);
  if (!Auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is requried" });
  }
  try {
    const decoded = jwt.verify(Auth, process.env.TOKEN_KEY);
    // console.log("Decoded TOKEN" + JSON.stringify(decoded));
    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Unauthorized, JWT TOKEN wrong or expired" });
  }
};

module.exports = ensureVerification;
