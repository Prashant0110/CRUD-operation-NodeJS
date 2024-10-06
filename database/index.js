const mongoose = require("mongoose");
require("dotenv").config();
const connectToDatabase = async () => {
  const connectionString = process.env.MONGODB_URI;
  await mongoose.connect(connectionString);
  console.log("It's connected successfully!");
};

module.exports = connectToDatabase;
