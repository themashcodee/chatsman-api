const User = require('../mongodb/models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getUserFromToken = async (token) => {
    if (!token) return null

    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async function (err, result) {
        if (err) return null

        try {
            const isUser = await User.findById(result.id)
            if (!isUser) return null
            return isUser
        } catch (err) {
            return null
        }
    })
}

module.exports = getUserFromToken