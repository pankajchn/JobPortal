const bcrypt = require("bcrypt");

const generateHashPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    console.log("Error Hashing Password:", error);
    return null;
  }
};

const comparePassword = (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log("Error Comparing Password:", error);
  }
};

module.exports = { generateHashPassword, comparePassword };
