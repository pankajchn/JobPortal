const express = require("express");
const { getJobs, createJobs } = require("../controllers/jobController");
const { userAuth } = require("../middlewares/userAuth");

const jobRoute = express.Router();

jobRoute.post("/jobs/create", userAuth, createJobs);
jobRoute.get("/jobs", userAuth, getJobs);

module.exports = jobRoute;
