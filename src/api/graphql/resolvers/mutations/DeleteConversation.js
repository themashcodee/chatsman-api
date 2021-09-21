const DeleteChat = async ({ args, pubsub, Conversation, Message, bucket }) => {
    try {
        const { conversationId } = args

        const isConversation = await Conversation.findOne({ _id: conversationId })
        if (!isConversation) return { success: false, message: "Conversation doesn't exist!" }

        const imagesMessages = await Message.find({ conversationId, type: "IMAGE" })
        if (imagesMessages.length) {
            imagesMessages.forEach(async (message) => {
                const existingImage = message.content.substring(47)
                await bucket.file(existingImage).delete()
            })
        }

        await Message.deleteMany({ conversationId })

        if (isConversation.wallpaper) {
            const existingImage = isConversation.wallpaper.substring(47)
            await bucket.file(existingImage).delete()
        }
        await Conversation.deleteOne({ _id: conversationId })

        isConversation.members.forEach(async (id) => {
            const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ updatedAt: -1 })
            pubsub.publish(id, { conversationAdded: { success: true, message: "", conversations } });
        })

        return { success: true, message: "Conversation has been deleted." }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = DeleteChat