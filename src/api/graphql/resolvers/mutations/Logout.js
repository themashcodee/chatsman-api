async function Logout({ args, User, res }) {
    try {
        const { secret, id } = args
        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User does not exist!" }
        if (isUser.secret !== secret) return { success: false, message: "Wrong Secret Code!" }
        res.cookie('refreshToken', null, {
            maxAge: 0,
            secure: true,
            path: '/',
            httpOnly: true,
            sameSite: 'none'
        })

        return { success: true, message: "User Logged out!" }
    } catch (err) {
        return { success: true, message: "There is some server error, try again later." }
    }
}

module.exports = Logout