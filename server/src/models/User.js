const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["jobseeker", "recruiter", "admin"],
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
          designation: {
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

userSchema.methods.generateJWT = function () {
  const currentUser = this;
  const token = jwt.sign({ id: currentUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
