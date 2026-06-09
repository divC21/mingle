const mongoose = require("mongoose");

const connectDB = async () => {
  const { connect } = mongoose;
  await connect(
    "mongodb+srv://divachauhan_db_user:Rudhvika01%40@nodejsproject.solpeep.mongodb.net/mingledb",
  );
};

module.exports = connectDB;
