const express = require("express");
const auth = require("../middlewares/auth");

const interestRouter = express.Router();

interestRouter.post("/sendInterest", auth, async (req, res) => {
  const user = req.user;
});

module.exports = interestRouter;
