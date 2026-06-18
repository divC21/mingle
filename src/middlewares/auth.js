const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const SECRET_KEY = "qwwertyuiop";

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not valid");
    const id = jwt.verify(token, SECRET_KEY);
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw new Error("Session expired");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};

module.exports = auth;
