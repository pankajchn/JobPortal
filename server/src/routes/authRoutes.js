const express = require("express");
const validateUser = require("../middlewares/validateUser");
const { registerUser, loginUser } = require("../controllers/authController");


const authRoutes = express.Router();

authRoutes.post("/register", validateUser, registerUser);
authRoutes.post("/login", loginUser)

module.exports = authRoutes;
