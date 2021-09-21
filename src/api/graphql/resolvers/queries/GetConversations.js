require('dotenv').config()

async function GetConversations({ User, Conversation, args }) {
    const { id } = args
    try {
        const isUserExist = await User.findById(id)
        if (!isUserExist) return { success: false, message: "User doesn't exist!" }

        const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ createdAt: -1 })

        return { success: true, message: "", conversations }
    } catch (err) {
        return { success: false, message: 'There is some server error, try again later' }
    }
}

module.exports = GetConversations