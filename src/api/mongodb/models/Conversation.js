const mongoose = require('mongoose')

const schema = mongoose.Schema({
    members: {
        required: true,
        type: [String]
    },
    lastMessage: {
        type: String,
    },
    lastMessageType: {
        type: String,
        enum: ['TEXT', 'IMAGE'],
    },
    wallpaper: {
        type: String
    }
}, { timestamps: true })

const Conversation = mongoose.model('Conversation', schema)

module.exports = Conversation