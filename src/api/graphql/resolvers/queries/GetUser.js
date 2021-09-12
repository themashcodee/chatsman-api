async function GetUser({ args, User }) {
    try {
        const { username, id } = args

        // CHECK USER EXIST
        const isUserExist = await User.findOne({ $or: [{ _id: id }, { username }] })
        if (!isUserExist) return ({ success: false, message: 'User does not exist!' })

        return {
            success: true,
            message: 'User Exist',
            user: isUserExist
        }
    } catch (err) {
        return {
            success: false,
            message: 'There is some server error, try again later'
        }
    }
}

module.exports = GetUser