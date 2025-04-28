const upload = require("../config/multer")

const uploadResume = async (req, res) => {
    try {
        const resumeUrl = req.file.path;
        console.log(resumeUrl)
        res.status(200).json({ message: "Resume uploaded successfully", resumeUrl })
    } catch (error) {
        console.error("Resume Upload Error ", error)
        res.status(500).json({ message: "Failed to upload resume" , error: error.message})
    }
}


module.exports = uploadResume;