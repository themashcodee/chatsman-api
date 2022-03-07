async function DeleteAccount({ args, User, res, bucket, Conversation, Message }) {
    try {
        const { secret, id } = args

        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User doesn't exist!" }
        if (isUser.secret !== secret) return { success: false, message: "Invalid secret code!" }


        if (isUser.image) {
            const existingImage = isUser.image.substring(47)
            await bucket.file(existingImage).delete()
        }

        await User.deleteOne({ secret, _id: id })

        const conversations = await Conversation.find({ members: { $in: [id] } })
        conversations.forEach(async (conversation) => {
            if (conversation.wallpaper) {
                const existingImage = conversation.wallpaper.substring(47)
                await bucket.file(existingImage).delete()
            }
            const imagesMessages = await Message.find({ conversationId: conversation._id, type: "IMAGE" })
            if (imagesMessages.length) {
                imagesMessages.forEach(async (message) => {
                    const existingImage = message.content.substring(47)
                    await bucket.file(existingImage).delete()
                })
            }
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

        return { success: true, message: "Account has been deleted." }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = DeleteAccount