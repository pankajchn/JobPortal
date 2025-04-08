const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password, phoneNumber, role, jobseeker, recruiter } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already registered. Please Login.");
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

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized User." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
      return res.status(401).json({message: "Unauthorized User."})
    }

    

  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser };
