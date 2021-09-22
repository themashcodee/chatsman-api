const DeleteMessage = async ({ args, pubsub, bucket, Message, Conversation }) => {
    try {
        const { id, senderId, conversationId } = args

        const isConversation = await Conversation.findById(conversationId)
        if (!isConversation) return { success: false, message: "Conversation doesn't exist!" }

        const isMessage = await Message.findOne({ _id: id, senderId, conversationId })
        if (!isMessage) return { success: false, message: "Message does not exist." }

        if (isMessage.type === 'IMAGE') {
            const existingImage = isMessage.content.substring(47)
            await bucket.file(existingImage).delete()
        }
        await Message.deleteOne({ _id: id, senderId, conversationId })

        const lastMessage = (await Message.find({ conversationId }).sort({ createdAt: -1 }).limit(1))[0]

        if (lastMessage) {
            if (+lastMessage.createdAt < +isMessage.createdAt) {
                isConversation.lastMessage = lastMessage
                isConversation.lastMessageTime = lastMessage.createdAt
                await isConversation.save()
            }
        } else {
            isConversation.lastMessage = undefined
            isConversation.lastMessageTime = undefined
            await isConversation.save()
        }

        pubsub.publish(
            conversationId,
            { messageAdded: { success: true, message: "", messages: [isMessage] } }
        );
        isConversation.members.forEach(async (id) => {
            const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ updatedAt: -1 })
            pubsub.publish(id, { conversationAdded: { success: true, message: "", conversations } });
        })

        return { success: true, message: "Message has been deleted." }
    } catch (err) {
        console.log(err)
        return { success: false, message: 'There is some server error, try again later.' }
    }
}

module.exports = DeleteMessage