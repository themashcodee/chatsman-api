const multer = require('../middlewares/multer')
const User = require('../mongodb/models/User')
const randomSecret = require('../helpers/randomSecret')
require('dotenv').config()

const upload = multer.single('file')
const bucket = require('../../config/gcp')

function profileimageupload(app) {
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

                if (isUser.image) {
                    const existingImage = isUser.image.substring(47)
                    await bucket.file(existingImage).delete()
                }

                const newFileName = randomSecret() + file.originalname
                const blob = bucket.file(newFileName)
                const blobStream = blob.createWriteStream()
                blobStream.on('error', err => console.log(err))
                blobStream.on('finish', async () => {
                    const publicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${blob.name}`
                    isUser.image = publicUrl
                    await isUser.save()
                    res.json({ success: true, message: 'Profile picture updated successfully!' })
                })
                blobStream.end(file.buffer)
            } catch (err) {
                res.json({ success: false, message: "There is some server error, try again later." })
            }
        })
    });
}

module.exports = profileimageupload