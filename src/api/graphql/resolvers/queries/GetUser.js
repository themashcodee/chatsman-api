async function GetUser({ args, User }) {
    try {
        const { username, id } = args

        const isUserExist = await User.findOne({ $or: [{ _id: id }, { username }] })
        if (!isUserExist) return ({ success: false, message: "User doesn't exist!" })

        return { success: true, message: '', user: isUserExist }
    } catch (err) {
        return { success: false, message: 'There is some server error, try again later' }
    }
}

module.exports = GetUser