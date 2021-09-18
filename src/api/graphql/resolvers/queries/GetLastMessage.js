
const LastMessage = async ({ args, Message }) => {
    try {
        const { conversationId } = args

        const messages = await Message.find({ conversationId }).sort({ createdAt: -1 }).limit(1)
        if (!messages) return { success: false, message: "No message available for this conversation." }

        return { success: true, message: "Here is the last message", messages: messages[0] }

    } catch (err) {
        return { success: true, message: "There is some server error, try again later." }
    }
}

module.exports = LastMessage