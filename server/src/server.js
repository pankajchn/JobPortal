const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoutes");
const jobRoute = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes")

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", jobRoute);
app.use("/api", userRoutes)


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
