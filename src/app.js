const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const auth = require("./middlewares/auth");
const UserModel = require("./models/User");

const app = express();

app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = "qwwertyuiop";

app.post("/signup", async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const reqObj = {
      ...req.body,
      password: encryptedPassword,
    };
    const user = new UserModel(reqObj);
    await user.save();
    res.status(200).send("User signed up successfully");
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send(err);
    } else {
      res.status(500).send(err.message);
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId });
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      const token = await userJWT();

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/profile", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.post("/sendConnectionRequest", auth, async (req, res) => {
  const user = req.user;
});
connectDB()
  .then(() => {
    console.log("DB connection established");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("DB connection failed");
  });
