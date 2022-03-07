const bcrypt = require('bcrypt')

const ChangePassword = async ({ args, User }) => {
    try {
        const { oldPassword, newPassword, id } = args

        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User doesn't exist!" }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, isUser.password)
        if (!isPasswordCorrect) return { success: false, message: "Wrong password!" }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        isUser.password = hashedPassword

        await isUser.save()
        return { success: true, message: "Password updated!" }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = ChangePassword