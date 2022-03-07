const GetMessages = async ({ args, Message }) => {
    try {
        const { conversationId, isFull } = args

        if (isFull) {
            const messages = await Message.find({ conversationId }).sort({ createdAt: -1 })
            return { success: true, message: "Here are the messages", messages: messages }
        }

        const messages = await Message.find({ conversationId }).sort({ createdAt: -1 }).limit(50)
        return { success: true, message: "Here are the messages", messages }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = GetMessages