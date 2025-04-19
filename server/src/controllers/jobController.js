const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs available at the moment" });
    }

    res.status(200).json({
      message: "All jobs fetched successully",
      totalJobs: jobs.length,
      jobs: jobs,
    });
  } catch (error) {
    console.log(error);
  }
};

const createJobs = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      city,
      salaryRange,
      experience,
      jobType,
      jobDescription,
      keySkills,
    } = req.body;

    if (
      !jobTitle ||
      !companyName ||
      !location ||
      !city ||
      !salaryRange ||
      !experience ||
      !jobType ||
      !jobDescription ||
      !keySkills
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newJob = {
      jobTitle,
      companyName,
      location,
      city,
      salaryRange,
      experience,
      jobType,
      jobDescription,
      keySkills,
    };

    const job = new Job(newJob);
    await job.save();
    return res
      .status(200)
      .json({ message: "New job successfully created.", job });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getJobs, createJobs };
