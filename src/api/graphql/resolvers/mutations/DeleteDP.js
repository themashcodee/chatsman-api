const DeleteDP = async ({ args, User, bucket }) => {
    try {
        const { id } = args

        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User doesn't exist!" }

        if (!isUser.image) return { success: false, message: "You don't have a Profile Picture" }

        const existingImage = isUser.image.substring(47)
        await bucket.file(existingImage).delete()

        isUser.image = ''
        await isUser.save()

        return { success: true, message: "Profile Picture has been deleted." }

    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }

}


module.exports = DeleteDP