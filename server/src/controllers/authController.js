const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber, role, jobseeker, recruiter } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already registered. Please Login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    if (role === "jobseeker") {
      newUser.jobseeker = {
        education: jobseeker.education,
        experience: jobseeker.experience,
        skills: jobseeker.skills,
        resume: jobseeker.resume,
      };
      newUser.recruiter = undefined;
    }

    if (role === "recruiter") {
      newUser.recruiter = {
        companyName: recruiter.companyName,
        companyWebsite: recruiter.companyWebsite,
      };
      newUser.jobseeker = undefined;
    }

    await newUser.save();

    const token = newUser.generateJWT();

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "User not found." });
    }

    const token = await user.generateJWT();

    res.status(200).json({ message: "User login successfully.", token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser };
