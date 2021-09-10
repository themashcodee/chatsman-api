const jwt = require('jsonwebtoken')
require('dotenv').config()

function GetConversations({ token, User, Conversation }) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async function (err, result) {
        if (err) return { success: false, message: 'Unauthorised token' }
        try {
            const isUserExist = await User.findById(result.id)
            if (!isUserExist) return { success: false, message: 'User does not exist!' }

            const conversations = await Conversation.find({ members: { $in: [result.id] } })

            return {
                success: true,
                message: 'Here are the conversations',
                conversations
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: 'There is some server error, try again later'
            }
        }
    })
}

module.exports = GetConversations