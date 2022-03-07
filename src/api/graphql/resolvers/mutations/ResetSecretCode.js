const { sendSecretCode } = require('../../../../config/emailSender')
const randomSecret = require('../../../helpers/randomSecret')

const ResetSecretCode = async ({ args, User }) => {
    try {
        const { email } = args

        const isUser = await User.findOne({ email })
        if (!isUser) return { success: false, message: "User doesn't exist!" }

        const secret = randomSecret()
        await sendSecretCode({ email, name: isUser.name, secret })

        isUser.secret = secret
        await isUser.save()

        return { success: true, message: "Secret code has changed, new secret code has sent to your email." }
    } catch (err) {
        return { success: false, message: "There is some server error, try again later." }
    }
}

module.exports = ResetSecretCode