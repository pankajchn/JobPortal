const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["job_seeker", "recruiter", "admin"],
    },
    jobseeker: {
      education: [
        {
          degree: {
            type: String,
          },
          institution: {
            type: String,
          },
          year: {
            type: Number,
          },
        },
      ],
      experience: [
        {
          companyName: {
            type: String,
          },
          jobRole: {
            type: String,
          },
          duration: {
            type: Number,
          },
        },
      ],
      skills: {
        type: [String],
      },
      resume: {
        type: String,
      },
    },
    recruiter: {
      companyName: {
        type: String,
      },
      companyWebsite: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
