const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 20,
    },
    members: {
        required: true,
        type: [String]
    },
    isGroup: {
        required: true,
        type: Boolean
    },
    image: {
        type: String
    }
}, { timestamps: true })

const Conversation = mongoose.model('Conversation', schema)

module.exports = Conversation