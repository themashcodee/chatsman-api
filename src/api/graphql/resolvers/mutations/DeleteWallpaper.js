const DeleteWallpaper = async ({ args, Conversation, bucket }) => {
    try {
        const { id, userId } = args

        const isConversation = await Conversation.findById(id)
        if (!isConversation) return { success: false, message: "Conversation doesn't exist!" }

        if (isConversation.members.indexOf(userId) === -1) return { success: false, message: "You aren't a member of this conversation." }

        if (!isConversation.wallpaper) return { success: false, message: "No wallpaper found in this conversation!" }

        const existingImage = isConversation.wallpaper.substring(47)
        await bucket.file(existingImage).delete()

        isConversation.wallpaper = ''
        await isConversation.save()

        return { success: true, message: "Wallpaper has been deleted." }

    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }

}


module.exports = DeleteWallpaper