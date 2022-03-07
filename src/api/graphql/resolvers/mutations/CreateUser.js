const bcrypt = require('bcrypt')
const randomSecret = require('../../../helpers/randomSecret')
const { sendSecretCode } = require('../../../../config/emailSender')

async function CreateUser({ args, User }) {
    try {
        const { name, email, password, username } = args

        const isUserAlreadyExist = await User.findOne({ $or: [{ email }, { username }] })
        if (isUserAlreadyExist) return ({ success: false, message: 'Email or Username already exist!' })

        const secret = randomSecret()
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword, username, secret, blocked: [] })
        await newUser.save()

        await sendSecretCode({ email, name, secret })

        return { success: true, message: 'A Secret Code has been sent to your email.' }
    } catch (err) {
        return { success: false, message: 'There is some server error, try again later.' }
    }
}

module.exports = CreateUser