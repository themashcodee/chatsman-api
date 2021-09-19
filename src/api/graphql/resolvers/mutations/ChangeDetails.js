const ChangeDetails = async ({ args, User }) => {
    try {
        const { id, username, name, description } = args

        if (!username && !name && !description) return { success: false, message: "No details found to update!" }

        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User doesn't exist!" }

        if (username && username === isUser.username) return { success: false, message: "This is already your username" }
        if (name && name === isUser.name) return { success: false, message: "This is already your name" }
        if (description && description === isUser.description) return { success: false, message: "This is already your bio" }


        if (username) {
            const isUsername = await User.findOne({ username })
            if (isUsername) return { success: false, message: "Username already exist!" }
            isUser.username = username
        }
        if (description) isUser.description = description
        if (name) isUser.name = name

        await isUser.save()
        return { success: true, message: "Details updated!" }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = ChangeDetails