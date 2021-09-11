async function Logout({ args, User, res }) {
    try {
        const { secret, id } = args

        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User does not exist!" }
        if (isUser.secret !== secret) return { success: false, message: "Wrong Secret!" }
        res.clearCookie('refreshToken')

        return { success: true, message: "User Logged out!" }
    } catch (err) {
        return { success: true, message: "Server Error" }
    }
}

module.exports = Logout