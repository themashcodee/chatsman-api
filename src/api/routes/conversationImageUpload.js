const multer = require('../middlewares/multer')
const Conversation = require('../mongodb/models/Conversation')
const { Message } = require('../mongodb/models/Message')
const randomSecret = require('../helpers/randomSecret')
require('dotenv').config()
const pubsub = require('../../config/pubsub')

const upload = multer.single('file')
const bucket = require('../../config/gcp')

function conversationImageUpload(app) {
    app.post('/conversationimageupload', (req, res) => {
        upload(req, res, async function (err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') return res.json({ success: false, message: "Image size can't be more than 5MB!" })
                return res.json({ success: false, message: 'There is some error in image uploading, try again later.' })
            }
            try {
                const file = req.file
                const conversationId = req.body.id
                const senderId = req.body.senderId
                const replyContent = req.body.replyContent
                const replyId = req.body.replyId

                if (!file) res.json({ success: false, message: "No Image found!" })
                const isConversation = await Conversation.findById(conversationId)
                if (!isConversation) return res.json({ success: false, message: "Conversation doesn't exist!" })

                if (isConversation.members.indexOf(senderId) === -1) return { success: false, messsage: "You aren't a member of this conversation." }

                const newFileName = randomSecret() + file.originalname
                const blob = bucket.file(newFileName)
                const blobStream = blob.createWriteStream()
                blobStream.on('error', err => res.json({ success: false, message: "There is some server error, try again later" }))
                blobStream.on('finish', async () => {
                    const publicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${blob.name}`

                    const newMessage = new Message({ conversationId, senderId, type: 'IMAGE', content: publicUrl, replyContent, replyId })
                    await newMessage.save()

                    isConversation.lastMessage = newMessage
                    isConversation.lastMessageTime = newMessage.createdAt
                    await isConversation.save()

                    pubsub.publish(conversationId, { messageAdded: { success: true, message: "", messages: [newMessage] } });
                    isConversation.members.forEach(async (id) => {
                        const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ updatedAt: -1 })
                        pubsub.publish(id, { conversationAdded: { success: true, message: "", conversations } });
                    })

                    res.json({ success: true, message: 'Message has been sent!' })
                })
                blobStream.end(file.buffer)
            } catch (err) {
                res.json({ success: false, message: "There is some server error, try again later." })
            }
        })
    });
}

module.exports = conversationImageUpload