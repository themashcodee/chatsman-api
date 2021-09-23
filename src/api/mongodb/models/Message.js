const mongoose = require('mongoose')

const schema = mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['TEXT', 'IMAGE'],
        required: true
    },
    replyContent: {
        type: String
    },
    replyId: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Message = mongoose.model('Message', schema)

module.exports = { Message, MessageSchema: schema }