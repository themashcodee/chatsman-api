async function CreateConversation({ args, Conversation, User }) {
    try {
        const { name, members, isGroup } = args

        const users = await User.find({ username: { $in: [...members] } });
        if (!(users.length > 1)) return { success: false, message: "User or Users does not exist!" }

        const userArrToIdArr = users.map(user => user._id)

        const isAlreadyConverstion = await Conversation.findOne({ members: [...userArrToIdArr] })
        if (isAlreadyConverstion) return { success: false, message: "Conversation already exist!" }

        const newConversation = new Conversation({ name, members: userArrToIdArr, isGroup })
        await newConversation.save()

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