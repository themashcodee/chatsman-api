const DeleteChat = async ({ args, pubsub, Conversation, Message }) => {
    try {
        const { conversationId } = args

        const isConversation = await Conversation.findOne({ _id: conversationId })
        if (!isConversation) return { success: false, message: "Conversation does not exist!" }

        await Message.deleteMany({ conversationId })
        await Conversation.deleteOne({ _id: conversationId })

        isConversation.members.forEach(async (id) => {
            const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ updatedAt: -1 })
            pubsub.publish(id, { conversationAdded: { success: true, message: "here is the result", conversations } });
        })

        return { success: true, message: "Conversation has been successfully deleted!" }
    } catch (err) {
        return { success: false, message: "Server Error" }
    }
}

module.exports = DeleteChat