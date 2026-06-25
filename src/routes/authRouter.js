const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId });
    console.log(user);
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = authRouter;
