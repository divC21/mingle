const express = require("express");

const app = express();

app.use("/user", (req, res) => {
  res.send("Hello from the server");
});
app.listen(3000);
