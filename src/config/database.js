const mongoose = require("mongoose");

const connectDB = async () => {
  const { connect } = mongoose;
  await connect(process.env.DATABASE_URL);
};

module.exports = connectDB;
