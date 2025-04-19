const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Unauthorized request." });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode.id;
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { userAuth };
