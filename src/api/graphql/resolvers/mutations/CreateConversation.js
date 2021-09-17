async function CreateConversation({ args, pubsub, Conversation, User }) {
    try {
        const { name, members, isGroup } = args

        const users = await User.find({ username: { $in: [...members] } });
        if (!(users.length > 1)) return { success: false, message: "User does not exist!" }

        const userArrToIdArr = users.map(user => user._id)

        const isAlreadyConverstion = await Conversation.findOne({ members: [...userArrToIdArr] })
        if (isAlreadyConverstion) return { success: false, message: "Conversation already exist!" }

        const newConversation = new Conversation({ name, members: userArrToIdArr, isGroup })
        await newConversation.save()


        userArrToIdArr.forEach(async (id) => {
            const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ updatedAt: -1 })
            pubsub.publish(id, { conversationAdded: { success: true, message: "here is the result", conversations } });
        })

        return {
            success: true,
            message: "Conversation has been created!",
            conversation: newConversation
        }

    } catch (err) {
        return { success: false, message: 'There is some server error, try again later.' }
    }
}

module.exports = CreateConversation