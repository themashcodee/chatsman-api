async function CreateConversation({ args, Conversation, User }) {
    try {
        const { name, members, isGroup } = args

        const users = await User.find({ '_id': { $in: [...members] } });
        if (!(users.length > 1)) return { success: false, message: "User or Users does not exist!" }

        const isAlreadyConverstion = await Conversation.findOne({ members: { $in: [...members] } })
        console.log(isAlreadyConverstion)
        if (isAlreadyConverstion) return { success: false, message: "Conversation already exist!" }

        const newConversation = new Conversation({ name, members, isGroup })
        await newConversation.save()

        return {
            success: true,
            message: 'Conversation has been created!',
            conversation: {
                ...newConversation, members: newConversation.members.map(async (id) => {
                    return await User.findById(id)
                })
            }
        }

    } catch (err) {
        console.log(err)
        return { success: false, message: 'There is some server error, try again later.' }
    }
}

module.exports = CreateConversation