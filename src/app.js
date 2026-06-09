const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/User");

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
  const user = new UserModel(req.body);
  user.save();
  res.status(200).send("User signed up successfully");
});

app.get("/users", async (req, res) => {
  try {
    const usersList = await UserModel.find({ ...req.query });
    if (usersList.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.status(200).send(usersList);
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

app.delete("/users", async (req, res) => {
  try {
    const userId = req.body.id;
    await UserModel.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.send("Something went wrong");
  }
});

app.patch("/users", async (req, res) => {
  try {
    const data = req.body;
    // await UserModel.findByIdAndUpdate(data.id, data);
    await UserModel.findOneAndUpdate({ emailId: data.emailId }, data);
    res.send("User updated successfully");
  } catch (err) {
    res.send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("DB connection established");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("DB connection failed");
  });
