async function CreateConversation({ args, pubsub, Conversation, User }) {
    try {
        const { members, creator } = args

        const users = await User.find({ username: { $in: [...members] } });
        if (users.length < 2) return { success: false, message: "User doesn't exist!" }

        const anotherUser = users.find(user => user.username !== creator)
        const creatorUser = users.find(user => user.username === creator)
        if (anotherUser.blocked.includes(creatorUser._id)) return { success: false, message: 'You have been blocked by this user.' }
        if (creatorUser.blocked.includes(anotherUser._id)) return { success: false, message: 'You have blocked this user.' }

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
        console.log(err)
        return { success: false, message: 'There is some server error, try again later.' }
    }
}

module.exports = CreateConversation