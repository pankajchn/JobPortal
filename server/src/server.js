const express = require("express");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

connectDB()
  .then(function () {
    console.log("Database connected succesfully");
    app.listen(port, function () {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(function (err) {
    console.log(`Database can not be connected ${err}`);
  });
