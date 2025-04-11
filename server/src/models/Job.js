const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    enum: ["On-site", "Remote", "Hybrid"],
    required: true,
  },
  salaryRange: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full Time", "Part Time", "Internship"],
  },
  jobDescription: {
    type: String,
    required: true,
  },
  keySkills: {
    type: [String],
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  applicationStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
