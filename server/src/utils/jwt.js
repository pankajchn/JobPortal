const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("Error Generating JWT:", error);
    return null;
  }
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.log("Error Verifying JWT:", error.message);
    return null;
  }
};


module.exports = {generateToken, verifyJWT}