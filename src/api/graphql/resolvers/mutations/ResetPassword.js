const { sendPassword } = require('../../../../config/emailSender')
const tempPassword = require('../../../helpers/tempPassword')
const bcrypt = require('bcrypt')

const ResetPassword = async ({ args, User }) => {
    try {
        const { email, secret } = args

        const isUser = await User.findOne({ email })
        if (!isUser) return { success: false, message: "User doesn't exist!" }
        if (isUser.secret !== secret) return { success: false, message: "Invalid Secret Code!" }

        const password = tempPassword()
        const hashedPassword = await bcrypt.hash(password, 10)
        isUser.password = hashedPassword
        await isUser.save()

        await sendPassword({ email: isUser.email, name: isUser.name, password })

        return { success: true, message: "A temporary password has been sent to your email." }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = ResetPassword