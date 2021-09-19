const mongoose = require('mongoose')

const schema = mongoose.Schema({
    members: {
        required: true,
        type: [String]
    },
    background: {
        type: String
    }
}, { timestamps: true })

const Conversation = mongoose.model('Conversation', schema)

module.exports = Conversation