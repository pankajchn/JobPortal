const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const { location, jobType, companyName, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (location) {
      filter.location = location;
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (companyName) {
      filter.companyName = companyName;
    }

    const jobs = await Job.find(filter)
      .sort({ postedDate: -1 }) // latest jobs first
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(filter);

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
};

const createJobs = async (req, res) => {
  const userId = req.user;

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
      createdBy: userId,
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

const getMyJobs = async (req, res) => {
  try {
    const userId = req.user;
    const myJobs = await Job.find({ createdBy: userId });
    if (!myJobs || myJobs.length === 0) {
      return res
        .status(200)
        .json({ message: "No jobs posted by this user yet." });
    }
    res.status(200).json({ message: "Jobs retrieved successfully", myJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const editJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user;
  try {
    const job = await Job.findById(jobId);

    if (job.createdBy.toString() !== userId) {
      return res
        .status(400)
        .json({ message: "Un-authorized to edit this job." });
    }

    const updateJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Job edited succss.", updateJob });
  } catch (error) {
    console.error("Error in edit profile", error);
    res
      .status(500)
      .json({ message: "Cannot update  job", error: error.message });
  }
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    if (userId !== job.createdBy.toString()) {
      return res.status(500).json({ message: "Unauthorized user." });
    }

    const deleteJob = await Job.findByIdAndDelete(jobId);

    res
      .status(200)
      .json({ message: "Job deleted successfully.", deleteJob: deleteJob });
  } catch (error) {
    console.error("Job can not be deleted", error);
    res.status(500).json({ message: "Job can not delete" });
  }
};

module.exports = { getJobs, createJobs, getMyJobs, editJob, deleteJob };
