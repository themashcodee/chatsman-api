const DeleteWallpaper = async ({ args, Conversation, pubsub, bucket }) => {
    try {
        const { id, userId } = args

        const isConversation = await Conversation.findById(id)
        if (!isConversation) return { success: false, message: "Conversation doesn't exist!" }

        if (isConversation.members.indexOf(userId) === -1) return { success: false, message: "You aren't a member of this conversation." }

        if (!isConversation.wallpaper) return { success: false, message: "No wallpaper found in this conversation!" }

        if (isConversation.wallpaper.includes('cloudinary.com')) await bucket.deleteImage(isConversation.wallpaper)

        isConversation.wallpaper = ''
        await isConversation.save()

        isConversation.members.forEach(async (id) => {
            const conversations = await Conversation.find({ members: { $in: [id] } }).sort({ updatedAt: -1 })
            pubsub.publish(id, { conversationAdded: { success: true, message: "", conversations } });
        })

        return { success: true, message: "Wallpaper has been deleted." }

    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }

}


module.exports = DeleteWallpaper