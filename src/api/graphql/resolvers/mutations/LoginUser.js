const bcrypt = require('bcrypt')
const { createToken } = require('../../../helpers/token')
require('dotenv').config()

async function LoginUser({ args, User, res }) {
    try {
        const { password, email, secret } = args

        const isUser = await User.findOne({ email, secret })
        if (!isUser) return { success: false, message: "Invalid details!" }

        const isPasswordCorrect = await bcrypt.compare(password, isUser.password)
        if (!isPasswordCorrect) return { success: false, message: "Invalid details!" }

        const accessToken = createToken({ id: isUser._id, type: 'access' })
        const refreshToken = createToken({ id: isUser._id, type: 'refresh' })

        res.cookie('refreshToken', refreshToken, {
            maxAge: 60000 * 60 * 24 * 60,
            secure: true,
            path: '/',
            httpOnly: true,
            sameSite: 'none'
        })

        return { token: accessToken, user: isUser, success: true, message: "User Logged In." }
    } catch (err) {
        return { success: false, message: 'There is some server error, try again later.' }
    }
}

module.exports = LoginUser