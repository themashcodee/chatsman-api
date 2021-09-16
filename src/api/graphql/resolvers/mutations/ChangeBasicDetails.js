const ChangeBasicDetails = async ({ args, User }) => {
    try {

        const { id, username, name, description } = args

        if (!username && !name && !description) return { success: false, message: "Input can't be empty!" }

        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User does not exist!" }

        if (username === isUser.username) return { success: false, message: "Its already your username" }
        if (name === isUser.name) return { success: false, message: "Its already your name" }
        if (description === isUser.description) return { success: false, message: "Its already your description" }

        if (username) {
            const isUsername = await User.findOne({ username })
            if (isUsername) return { success: false, message: "Username already exist!" }
            isUser.username = username
        }
        if (description) {
            isUser.description = description
        }
        if (name) {
            isUser.name = name
        }

        await isUser.save()
        return { success: true, message: "Details successfully updated" }
    } catch (err) {
        return { success: false, message: "There is some error, try again later." }
    }
}

module.exports = ChangeBasicDetails