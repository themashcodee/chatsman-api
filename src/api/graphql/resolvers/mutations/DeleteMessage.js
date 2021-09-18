const DeleteMessage = async ({ args, pubsub, Message }) => {
    try {
        const { id, senderId, conversationId } = args


        const deletedMessage = await Message.deleteOne({ _id: id, senderId, conversationId })
        if (!deletedMessage) return { success: false, message: "Message not exist or you don't have permission to delete this message" }

        const messages = await Message.find({ conversationId }).sort({ createdAt: -1 }).limit(50)
        pubsub.publish(conversationId, { messageAdded: { success: true, message: "here is the result", messages: messages.reverse() } });
        pubsub.publish(`${conversationId}LM`, { lastMessageAdded: { success: true, message: "This is last message", messages: messages[messages.length - 1] } });

        return { success: true, message: "Message deleted successfully!" }
    } catch (err) {
        console.log(err)
        return { success: false, message: 'There is some server error, try again later.' }
    }
}

module.exports = DeleteMessage