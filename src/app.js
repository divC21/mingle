const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/User");

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
  console.log(req.body);
  const user = new UserModel(req.body);
  user.save();
  res.status(200).send("User signed up successfully");
});

connectDB()
  .then(() => {
    console.log("DB connection established");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("DB connection failed");
  });
