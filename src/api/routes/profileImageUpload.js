const multer = require('../middlewares/multer')
const User = require('../mongodb/models/User')
const { Storage } = require('@google-cloud/storage')
const randomSecret = require('../helpers/randomSecret')
require('dotenv').config()

const upload = multer.single('file')

const storage = new Storage({
    projectId: process.env.GCP_PROJECT,
    credentials: { client_email: process.env.GCP_CLIENT_EMAIL, private_key: process.env.GCP_PRIVATE_KEY }
});
const bucket = storage.bucket(process.env.GCP_BUCKET);

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
                if (!isUser) return res.json({ success: false, message: "User does not exist" })

                if (isUser.image) {
                    const existingFileName = isUser.image.substring(47)
                    await bucket.file(existingFileName).delete()
                }

                const newFileName = randomSecret() + file.originalname
                const blob = bucket.file(newFileName)
                const blobStream = blob.createWriteStream()
                blobStream.on('error', err => console.log(err))
                blobStream.on('finish', async () => {
                    const publicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${blob.name}`
                    isUser.image = publicUrl
                    await isUser.save()
                })
                blobStream.end(file.buffer)
                res.json({ success: true, message: 'Profile picture updated successfully!' })
            } catch (err) {
                res.json({ success: false, message: "There is some server error, try again later." })
            }
        })
    });
}

module.exports = profileimageupload