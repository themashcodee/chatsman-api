async function DeleteAccount({ args, User, res, Conversation }) {
    try {
        const { secret, id } = args

        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User does not exist!" }
        if (isUser.secret !== secret) return { success: false, message: "Wrong Secret Code!" }

        await User.deleteOne({ secret, _id: id })

        await Conversation.deleteMany({ members: { $in: [id] } })

        res.cookie('refreshToken', null, {
            maxAge: 0,
            secure: true,
            path: '/',
            httpOnly: true,
            sameSite: 'none'
        })

        return { success: true, message: "User account has been successfully deleted!" }
    } catch (err) {
        return { success: false, message: "Server Error" }
    }
}

module.exports = DeleteAccount