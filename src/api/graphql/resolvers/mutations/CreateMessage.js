const CreateMessage = async ({ args, pubsub, Message, Conversation }) => {
    try {
        const { senderId, content, conversationId } = args

        const isConversation = await Conversation.findById(conversationId)
        if (!isConversation) return { success: false, message: "Conversation doesn't exist!" }

        if (isConversation.members.indexOf(senderId) === -1)
            return { success: false, message: "You aren't a member of this conversation." }

        const newMessage = new Message({ conversationId, senderId, type: 'TEXT', content })
        await newMessage.save()

        isConversation.lastMessage = newMessage
        isConversation.lastMessageTime = newMessage.createdAt
        await isConversation.save()

        const messages = await Message.find({ conversationId }).sort({ createdAt: -1 }).limit(50)

        pubsub.publish(conversationId, { messageAdded: { success: true, message: "", messages } });
        isConversation.members.forEach(async (id) => {
            const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ updatedAt: -1 })
            pubsub.publish(id, { conversationAdded: { success: true, message: "", conversations } });
        })

        return { success: true, message: "Message has been Sent." }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = CreateMessage