const CreateMessage = async ({ args, Message, Conversation, User }) => {
    try {
        const { senderId, type, content, conversationId } = args

        const isConversation = await Conversation.findById(conversationId)
        if (!isConversation) return { success: false, message: "Conversation does not exist" }

        if (isConversation.members.indexOf(senderId) === -1) return { success: false, message: "Sender is not valid for this conversation" }

        const newMessage = new Message({ conversationId, senderId, type, content })
        await newMessage.save()

        return { success: true, message: "Message Sent" }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = CreateMessage