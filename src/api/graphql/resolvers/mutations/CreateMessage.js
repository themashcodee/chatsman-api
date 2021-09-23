const CreateMessage = async ({ args, pubsub, Message, Conversation }) => {
    try {
        const { senderId, content, conversationId, replyContent, replyId } = args

        if ((replyContent && !replyId) || (replyId && !replyContent)) return {
            success: false,
            message: "Reply Id and reply content are made for each other, you have to pass both"
        }

        const isConversation = await Conversation.findById(conversationId)
        if (!isConversation) return { success: false, message: "Conversation doesn't exist!" }

        if (isConversation.members.indexOf(senderId) === -1)
            return { success: false, message: "You aren't a member of this conversation." }

        const newMessage = new Message({
            conversationId, senderId, type: 'TEXT', content, replyId, replyContent
        })
        await newMessage.save()

        isConversation.lastMessage = newMessage
        isConversation.lastMessageTime = newMessage.createdAt
        await isConversation.save()

        pubsub.publish(conversationId, { messageAdded: { success: true, message: "", messages: [newMessage] } });
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