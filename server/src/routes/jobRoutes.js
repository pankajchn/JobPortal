const express = require("express");
const {
  getJobs,
  createJobs,
  getMyJobs,
  editJob,
  deleteJob,
} = require("../controllers/jobController");
const { userAuth } = require("../middlewares/userAuth");

const jobRoute = express.Router();

jobRoute.post("/jobs/create", userAuth, createJobs);
jobRoute.get("/jobs", userAuth, getJobs);
jobRoute.get("/jobs/my-jobs", userAuth, getMyJobs);
jobRoute.put("/jobs/:id", userAuth, editJob);
jobRoute.delete("/jobs/:id", userAuth, deleteJob);

module.exports = jobRoute;
