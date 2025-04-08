const express = require("express");
const validateUser = require("../middlewares/validateUser");
const { registerUser } = require("../controllers/authController");

const authRoutes = express.Router();

authRoutes.post("/register", validateUser, registerUser);

module.exports = authRoutes;
