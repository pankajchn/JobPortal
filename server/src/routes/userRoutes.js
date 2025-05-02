const express = require("express");
const { uploadResume, editProfile } = require("../controllers/userController");
const upload = require("../config/multer");
const { userAuth } = require("../middlewares/userAuth");

const userRoutes = express.Router();

userRoutes.post("/user/upload-resume", upload.single("resume"), uploadResume);
userRoutes.patch("/user/edit-profile", userAuth, editProfile);

module.exports = userRoutes;
