const mongoose = require('mongoose')
const { MessageSchema } = require('./Message')

const schema = mongoose.Schema({
    members: {
        required: true,
        type: [String]
    },
    lastMessageTime: {
        type: Date
    },
    lastMessage: MessageSchema,
    wallpaper: {
        type: String
    }
}, { timestamps: true })

const Conversation = mongoose.model('Conversation', schema)

module.exports = Conversation