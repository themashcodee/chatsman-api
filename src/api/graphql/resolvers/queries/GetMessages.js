const GetMessages = async ({ args, Message }) => {
    try {
        const { conversationId, senderId } = args

        const messages = await Message.find({ conversationId, senderId })

        return { success: true, message: "Here are the messages", messages }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = GetMessages