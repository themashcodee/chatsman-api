const multer = require('../middlewares/multer')
const Conversation = require('../mongodb/models/Conversation')
require('dotenv').config()
const pubsub = require('../../config/pubsub')
const { uploadFile, deleteImage } = require('../../config/cloudinary')

const upload = multer.single('file')

function backgroundUpload(app) {
    app.post('/backgroundupload', (req, res) => {
        upload(req, res, async function (err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') return res.json({ success: false, message: "Image size can't be more than 5MB!" })
                return res.json({ success: false, message: 'There is some error in image uploading, try again later.' })
            }
            try {
                const file = req.file
                const convId = req.body.id

                if (!file) res.json({ success: false, message: "No Image found!" })
                const isConversation = await Conversation.findById(convId)
                if (!isConversation) return res.json({ success: false, message: "Conversation doesn't exist!" })

                const oldUrl = isConversation.wallpaper || null
                const url = await uploadFile(file)
                isConversation.wallpaper = url
                await isConversation.save()

                isConversation.members.forEach(async (id) => {
                    const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ updatedAt: -1 })
                    pubsub.publish(id, { conversationAdded: { success: true, message: "", conversations } });
                })
                res.json({ success: true, message: 'Background has been updated!', url })

                if (oldUrl && oldUrl.includes('cloudinary.com')) await deleteImage(oldUrl)
            } catch (err) {
                res.json({ success: false, message: "There is some server error, try again later." })
            }
        })
    });
}

module.exports = backgroundUpload