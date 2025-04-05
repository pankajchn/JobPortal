const User = require("../models/user");

const Register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(404).json({ message: "Already Registered! Please Login" });
    }

    const newUser = new User({ name, email, password, phoneNumber, role });
  } catch (err) {
    
  }
};
