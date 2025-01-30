const express = require("express");
const router = express.Router();
const ensureVerification = require("../Middlewares/Verification");

router.get("/products", ensureVerification, async (req, res) => {
  console.log("Authenticated User:---------> " + req.user.email);       //email _id iat exp
  res.json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "car",
      price: 290006,
    },
  ]);
});
module.exports = router;
