const express = require("express");
const auth = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = profileRouter;
