
const CreateMessage = async ({ args, pubsub, Message, Conversation }) => {
    try {
        const { senderId, type, content, conversationId } = args

        const isConversation = await Conversation.findById(conversationId)
        if (!isConversation) return { success: false, message: "Conversation does not exist" }

        if (isConversation.members.indexOf(senderId) === -1) return { success: false, message: "Sender is not valid for this conversation" }

        const newMessage = new Message({ conversationId, senderId, type, content })
        await newMessage.save()

        const messages = await Message.find({ conversationId })

        pubsub.publish(conversationId, { messageAdded: { success: true, message: "here is the result", messages } });

        return { success: true, message: "Message Sent" }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = CreateMessage