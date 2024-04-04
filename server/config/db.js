const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const url = process.env.MONGODB
const connection = () => {
  mongoose.connect(
    url
  );
  console.log("DB");
};
module.exports = { connection };
