async function CreateConversation({ args, pubsub, Conversation, User }) {
    try {
        const { members } = args

        const users = await User.find({ username: { $in: [...members] } });
        if (!(users.length > 1)) return { success: false, message: "User doesn't exist!" }

        const userArrToIdArr = users.map(user => user._id)

        const isAlreadyConverstion = await Conversation.findOne({ members: [...userArrToIdArr] })
        if (isAlreadyConverstion) return { success: false, message: "Conversation already exist!" }

        const newConversation = new Conversation({ members: userArrToIdArr })
        await newConversation.save()

        userArrToIdArr.forEach(async (id) => {
            const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ updatedAt: -1 })
            pubsub.publish(id, { conversationAdded: { success: true, message: "", conversations } });
        })

        return { success: true, message: "Conversation has been created." }
    } catch (err) {
        return { success: false, message: 'There is some server error, try again later.' }
    }
}

module.exports = CreateConversation