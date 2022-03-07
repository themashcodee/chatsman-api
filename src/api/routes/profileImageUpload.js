const multer = require('../middlewares/multer')
const User = require('../mongodb/models/User')
require('dotenv').config()
const { uploadFile, deleteImage } = require('../../config/cloudinary')
const upload = multer.single('file')

function profileImageUpload(app) {
    app.post('/profileimageupload', (req, res) => {
        upload(req, res, async function (err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') return res.json({ success: false, message: "Image size can't be more than 5MB!" })
                return res.json({ success: false, message: 'There is some error in image uploading, try again later.' })
            }
            try {
                const file = req.file
                const userId = req.body.id

                if (!file) res.json({ success: false, message: "No Image found!" })
                const isUser = await User.findById(userId)
                if (!isUser) return res.json({ success: false, message: "User doesn't exist" })

                const url = await uploadFile(file);
                const oldUrl = isUser.image || null
                isUser.image = url
                await isUser.save()

                res.json({ success: true, message: 'Profile picture has been updated!', user: isUser })

                if (oldUrl && oldUrl.includes('cloudinary.com')) await deleteImage(oldUrl)
            } catch (err) {
                res.json({ success: false, message: "There is some server error, try again later." })
            }
        })
    });
}

module.exports = profileImageUpload