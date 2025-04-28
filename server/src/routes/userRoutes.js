const express = require("express")
const uploadResume = require("../controllers/userController")
const upload = require("../config/multer")

const userRoutes = express.Router()

userRoutes.post("/upload-resume", upload.single("resume"), uploadResume)



module.exports = userRoutes;