require("dotenv").config();

//
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const AuthRoute = require("./Routes/AuthRouter");
const ProductRoute = require("./Routes/ProductsRouter");

// env
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

//  MiddleWare Section
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://jwt-local-storage.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then((res) => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/good", (req, res) => {
  res.send("All good ");
});

app.use("/auth", AuthRoute);
app.use("/", ProductRoute);

app.listen(PORT, () => {
  console.log(`sever running on port ${PORT}`);
});
