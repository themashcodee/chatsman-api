const DeleteMessage = async ({ args, pubsub, Message }) => {
    try {
        const { id, senderId, conversationId } = args

        const isMessage = await Message.deleteOne({ _id: id, senderId, conversationId })
        if (!isMessage) return { success: false, message: "Message does not exist." }

        const messages = await Message.find({ conversationId }).sort({ createdAt: -1 }).limit(50)
        pubsub.publish(
            conversationId,
            { messageAdded: { success: true, message: "", messages: messages.reverse() } }
        );
        pubsub.publish(
            `${conversationId}LM`,
            {
                lastMessageAdded:
                    { success: true, message: "", messages: messages.length ? messages[messages.length - 1] : null }
            }
        );

        return { success: true, message: "Message has been deleted." }
    } catch (err) {
        return { success: false, message: 'There is some server error, try again later.' }
    }
}

module.exports = DeleteMessage