const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    username: {
        type: String,
        max: 10,
        min: 3,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    secret: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
}, { timestamps: true })

const User = mongoose.model('User', schema)

module.exports = User