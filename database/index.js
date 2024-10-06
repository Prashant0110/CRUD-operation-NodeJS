const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://Prashant:root@cluster0.ri6fc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connectToDatabase = async () => {
  await mongoose.connect(connectionString);
  console.log("its connected successfully!");
};

module.exports = connectToDatabase;
