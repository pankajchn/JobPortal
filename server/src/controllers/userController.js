const upload = require("../config/multer");
const User = require("../models/User");

const uploadResume = async (req, res) => {
  try {
    const resumeUrl = req.file.path;
    console.log(resumeUrl);
    res
      .status(200)
      .json({ message: "Resume uploaded successfully", resumeUrl });
  } catch (error) {
    console.error("Resume Upload Error ", error);
    res
      .status(500)
      .json({ message: "Failed to upload resume", error: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
    if (user.role === "jobseeker") {
      updateData.jobseeker = {
        ...user.jobseeker,
        ...req.body.jobseeker,
      };
    }
    if (user.role === "recruiter") {
      updateData.recruiter = {
        ...user.recruiter,
        ...req.body.recruiter,
      };
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    res
      .status(200)
      .json({ message: "Profile updated succcefully", updateUser });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      message: "Errror while updating user profile",
      error: error.message,
    });
  }
};

module.exports = { uploadResume, editProfile };
