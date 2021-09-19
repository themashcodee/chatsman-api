const bucket = require('../../../../config/gcp')


async function DeleteAccount({ args, User, res, Conversation, Message }) {
    try {
        const { secret, id } = args

        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User does not exist!" }
        if (isUser.secret !== secret) return { success: false, message: "Wrong Secret Code!" }


        if (isUser.image) {
            const existingFileName = isUser.image.substring(47)
            await bucket.file(existingFileName).delete()
        }

        await User.deleteOne({ secret, _id: id })

        const conversations = await Conversation.find({ members: { $in: [id] } })
        conversations.forEach(async (conversation) => {
            await Message.deleteMany({ conversationId: conversation._id })
        })

        await Conversation.deleteMany({ members: { $in: [id] } })

        res.cookie('refreshToken', null, {
            maxAge: 0,
            secure: true,
            path: '/',
            httpOnly: true,
            sameSite: 'none'
        })

        return { success: true, message: "User account has been successfully deleted!" }
    } catch (err) {
        return { success: false, message: "Server Error" }
    }
}

module.exports = DeleteAccount