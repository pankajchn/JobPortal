const validator = require("validator");
const zxcvbn = require("zxcvbn");

const validateUser = (req, res, next) => {
  const { name, email, password, phoneNumber, role, jobseeker, recruiter } =
    req.body;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name is required and must be at least 3 characters" });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const pwdStrength = zxcvbn(password);
  if (pwdStrength.score < 3) {
    return res.status(400).json({ message: "Password is too weak" });
  }

  if (!phoneNumber || !/^\d{10}$/.test(phoneNumber.toString())) {
    return res.status(400).json({ message: "Phone number must be 10 digits" });
  }

  if (!role || !["jobseeker", "recruiter", "admin"].includes(role)) {
    return res
      .status(400)
      .json({ message: "Role must be either jobseeker, recruiter or admin" });
  }

  if (role === "jobseeker") {
    if (!jobseeker) {
      return res
        .status(400)
        .json({ message: "Jobseeker details are required" });
    }

    const { education, experience, skills, resume } = jobseeker;

    if (!Array.isArray(education) || education.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one education entry is required" });
    }

    for (const edu of education) {
      if (!edu.degree || !edu.institution || !edu.year) {
        return res.status(400).json({
          message: "Each education must include degree, institution, and year",
        });
      }
    }

    if (!Array.isArray(experience)) {
      return res
        .status(400)
        .json({ message: "Experience must be an array (can be empty)" });
    }

    for (const exp of experience) {
      if (!exp.companyName || !exp.designation || !exp.duration) {
        return res.status(400).json({
          message:
            "Each experience must include companyName, designation, and duration",
        });
      }
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one skill is required" });
    }

    if (!resume) {
      return res.status(400).json({ message: "Resume is required" });
    }
  }

  if (role === "recruiter") {
    if (!recruiter) {
      return res
        .status(400)
        .json({ message: "Recruiter details are required" });
    }

    const { companyName, companyWebsite } = recruiter;

    if (!companyName || !companyWebsite) {
      return res.status(400).json({
        message: "Recruiter must include companyName and companyWebsite",
      });
    }

    if (!validator.isURL(companyWebsite)) {
      return res
        .status(400)
        .json({ message: "Company website must be a valid URL" });
    }
  }

  next();
};

module.exports = validateUser;
