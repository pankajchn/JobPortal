const Job = require("../models/Job");



const getJobs = async (req, res) => {
  try {
    const { location, jobType, companyName, page = 1, limit = 10 } = req.query

    const filter = {}

    if (location) {
      filter.location = location
    }

    if (jobType) {
      filter.jobType = jobType
    }

    if (companyName) {
      filter.companyName = companyName
    }

    const jobs = await Job.find(filter)
    .sort({ postedDate: -1 }) // latest jobs first
    .skip((page - 1) * limit)
    .limit(Number(limit));

    const totalJobs = await Job.countDocuments(filter)

    res.status(200).json({
      message: "Jobs fetched successfully",
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
      jobs,
    });

  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Server error while fetching jobs" });
  }
}


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
