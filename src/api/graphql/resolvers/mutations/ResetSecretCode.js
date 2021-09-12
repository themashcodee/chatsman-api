const sendEmail = require('../../../../config/emailSender')
const randomSecret = require('../../../helpers/randomSecret')

const ResetSecretCode = async ({ args, User }) => {
    try {
        const { id } = args

        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User does not exist!" }

        const secret = randomSecret()
        await sendEmail({ email: isUser.email, name: isUser.name, secret })

        isUser.secret = secret
        await isUser.save()

        return { success: true, message: "Secret code successfully changed, new secret has sent to your email." }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = ResetSecretCode